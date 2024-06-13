import { useLocation } from "react-router-dom";
import { useMemo } from "react";

export function useQuery() {
//pega os parametros quando a pagina é chamada
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
}

// Esse código é um exemplo de um custom hook chamado useQuery que utiliza o useLocation do React Router DOM para obter os parâmetros de busca da URL.

// A função useLocation retorna um objeto contendo informações sobre a localização atual (URL) da página, incluindo a propriedade search, que contém a parte da URL após o ponto de interrogação (?), onde os parâmetros de busca são especificados.

// Em seguida, a função useMemo é utilizada para memorizar o resultado da criação de um novo objeto URLSearchParams com base no valor de search. URLSearchParams é uma interface fornecida pelo navegador para lidar com os parâmetros de busca de uma URL de forma fácil e conveniente.

// O uso do useMemo garante que o objeto URLSearchParams seja recriado apenas quando o valor de search mudar, evitando recriações desnecessárias do objeto em cada renderização. Isso é útil para melhorar o desempenho, especialmente em casos onde a criação do objeto pode ser custosa em termos de processamento.