

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";

import { useState, useEffect } from "react";

export const useAuthentication = () => {

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);


  // lidar com vazamento de memória

  //Em React, especialmente quando se trabalha com componentes que realizam operações assíncronas (como fetch de dados, setTimeout, setInterval, etc.), 
  //É possível que essas operações tentem atualizar o estado de um componente depois que ele já foi desmontado (unmounted). Isso pode causar um erro ou, em alguns casos, um vazamento de memória.
  //Para lidar com isso, podemos usar um estado booleano como cancelled para verificar se o componente ainda está montado antes de tentar atualizar o estado.
  const [cancelled, setCancelled] = useState(false);

  //função do firebase

  // auth é uma instância do serviço de autenticação do Firebase. A função getAuth() é importada do pacote firebase/auth e é usada para inicializar e obter a instância de autenticação associada à aplicação Firebase configurada. Essa instância é usada para realizar operações de autenticação, como registro, login e logout de usuários.
  const auth = getAuth();

  function checkIfIsCancelled() {
    if (cancelled) {
      return;
    }
  }

  //Register
  const createUser = async (data) => {

    setLoading(true);

    try {

      //criação de um usuário, função do firebase 
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      //colocando o nome do usuario: o firebase interpreta o nome do usuario de forma separada do email e senha, são salvos em lugares diferentes.
      await updateProfile(user, {
        displayName: data.displayName,
      });

      return user;

    } catch (error) {

  

      let systemErrorMessage;

      if (error.message.includes("Password")) {
        systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres.";
      } else if (error.message.includes("email-already")) {
        systemErrorMessage = "E-mail já cadastrado.";
      } else {
        systemErrorMessage = "Ocorreu um erro, por favor tenta mais tarde.";
      }

      checkIfIsCancelled();
      setError(systemErrorMessage);
    }

    checkIfIsCancelled();
    setLoading(false);
  };

  //logout
  const logout = () => {

    checkIfIsCancelled();

    signOut(auth);
  };


  // função de login
  const login = async (data) => {

    checkIfIsCancelled();

    setLoading(true);
    setError(false);

    try {

      await signInWithEmailAndPassword(auth, data.email, data.password);

    } catch (error) {
      console.log(error.message);
      console.log(typeof error.message);
      console.log(error.message.includes("user-not"));

      let systemErrorMessage;
      if (error.message.includes("Firebase: Error (auth/invalid-credential).")) {
        systemErrorMessage = "Usuário não encontrado.";
      } else if (error.message.includes("Firebase: Error (auth/invalid-credential).")) {
        systemErrorMessage = "Senha incorreta.";
      } else {
        systemErrorMessage = "Ocorreu um erro, por favor tenta mais tarde.";
      }

      console.log(systemErrorMessage);

      setError(systemErrorMessage);
    }

    console.log(error);

    setLoading(false);
  };

  useEffect(() => {

    return () => setCancelled(true);

  }, []);

  return {
    auth,
    createUser,
    error,
    logout,
    login,
    loading,
  };
};


// Explicação Detalhada do cancelled
// Componente Monta: Quando o componente Register monta, ele chama o hook useAuthentication e obtém as funções createUser, loading e error.

// Início da Operação Assíncrona: Quando o usuário envia o formulário de registro, a função handleRegister é chamada, que por sua vez chama createUser no hook useAuthentication. Esta função inicia a operação assíncrona para criar um novo usuário no Firebase.

// Componente Desmonta: Se durante a operação assíncrona o componente Register for desmontado (por exemplo, o usuário navega para outra página), o hook useEffect dentro do useAuthentication define cancelled para true.

// Operação Assíncrona Completa: Quando a operação assíncrona termina, a função createUser tenta atualizar o estado (setError, setLoading, etc.).

// Verificação de Cancelamento: Antes de qualquer atualização de estado, checkIfIsCancelled é chamada para verificar se o componente ainda está montado. Se cancelled for true, a função retorna imediatamente e evita qualquer atualização de estado.


// Cenário sem checkIfIsCancelled:
// Se o componente de registro é desmontado (por exemplo, o usuário navega para outra página) enquanto a operação assíncrona está em progresso, e a operação tenta atualizar loading ou error após a desmontagem, ocorrerá um erro, pois o componente não existe mais para receber essas atualizações.