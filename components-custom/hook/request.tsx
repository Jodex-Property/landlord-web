"use client";
export const dynamic = "force-dynamic";

/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";

const baseURL =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "http://backend-app.jodexservices.com/api/v1";

export default function useApi(
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  headers: Record<string, any> = {}
) {
  const [loading, setLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<any>(null);
  const [statusCode, setStatusCode] = useState<number>(0);

  async function makeRequest(
    data: any = null,
    params: Record<string, string> = {}
  ): Promise<[any, number]> {
    setLoading(true);

    const queryParams: string = new URLSearchParams(params).toString();
    const urlWithParams: string = queryParams
      ? `${baseURL}${endpoint}?${queryParams}`
      : `${baseURL}${endpoint}`;

    let body: any;
    let contentType: string = "application/json";

    if (data instanceof FormData) {
      body = data;
      contentType = "multipart/form-data";
    } else if (
      method === "POST" ||
      method === "PUT" ||
      method === "DELETE" ||
      method === "PATCH"
    ) {
      body = JSON.stringify(data);
    }

    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

      const res = await fetch(urlWithParams, {
        method,
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
          ...headers,
          ...(contentType !== "multipart/form-data" && { "Content-Type": contentType }),
        },
        body: body,
      });

      const json = await res.json();

      setResponse(json);
      setStatusCode(res.status);
      setLoading(false);

      return [json, res.status];
    } catch (error: any) {
      setLoading(false);
      console.error("Request failed:", error);
      return [null, 0];
    }
  }

  return { loading, makeRequest, response, statusCode };
}
