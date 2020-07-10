import { readLines } from "https://deno.land/std@v0.51.0/io/bufio.ts";

export async function ask(question: string) {
  console.log(question)

  for await (const line of readLines(Deno.stdin)) {
    return line
  }
}
