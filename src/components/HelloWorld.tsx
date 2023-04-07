import React from "react";
import { gql, useQuery } from "@apollo/client";
import { useHelloWorldQuery } from "../generated/graphql";

const HelloWorld = () => {
  const { data, error, loading } = useHelloWorldQuery();

  return (
    <div>
      {loading && <div>Loading....</div>}
      {error && <div>Error</div>}
      {data && <div>{data.helloworld}</div>}
    </div>
  );
};

export default HelloWorld;
