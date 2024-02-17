"use client";

import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import zodiacData from "./zodiac.json";
import { useState } from "react";

export default function Home() {
  const [search, setSearch] = useState("");

  const renderTable = (startYear: number, searchYear: number = -1) => {
    const thisYear = new Date().getFullYear();
    const data = [];
    if (search.length > 4) {
    }
    for (let i = startYear; i < thisYear; i += 12) {
      const age = thisYear - i;
      data.push([i, age]);
    }
    return (
      <div className="text-center text-lg">
        {data.map(([i, age]) => (
          <div key={i} className="grid grid-cols-[4fr_auto_3fr]">
            <span className={`${searchYear === i ? "text-xl font-black" : ""}`}>
              {i}
            </span>
            <span className="">{"->"}</span>
            <span className={`${searchYear === i ? "text-xl font-black" : ""}`}>
              {age}
            </span>
          </div>
        ))}
      </div>
    );
  };

  const renderSearch = (search: string) => {
    const searchYear = parseInt(search);
    const zodiac = Object.entries(zodiacData).find(
      ([_, value]) => (searchYear % value) % 12 === 0,
    );

    if (!zodiac) return <p className="text-center text-red-100">Not found.</p>;

    return (
      <Card className="bg-red-200 border-0 w-[80%] max-w-[280px] mx-auto">
        <CardHeader>
          <CardTitle className="text-center">{zodiac[0]}</CardTitle>
        </CardHeader>
        <CardContent>{renderTable(zodiac[1], searchYear)}</CardContent>
      </Card>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-red-900">
      <header className="py-10 text-center">
        <div className="container px-4">
          <div className="space-y-1">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-red-200">
              Chinese Zodiac Ages
            </h1>
            <p className="mx-auto max-w-2xl text-red-300 md:text-xl/relaxed">
              Discover the ages corresponding to each Chinese zodiac sign.
            </p>
          </div>
        </div>
      </header>

      <main className="w-[80%] max-w-6xl mx-auto">
        <div className="relative mb-10 w-[80%] max-w-96 mx-auto">
          <Input
            inputMode="numeric"
            className="bg-transparent text-red-100 placeholder:text-red-100"
            placeholder="Search year of birth"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            onKeyDown={(e) => {
              if (e.key !== "Backspace" && isNaN(parseInt(e.key))) {
                e.preventDefault();
              }
            }}
            onKeyUp={(e) => {
              const target = e.target as HTMLInputElement;
              if (target.value.length === 4) {
                target.blur();
              }
            }}
          />
          {search.length > 0 ? (
            <Button
              className="absolute right-2 top-1/2 -translate-y-1/2 leading-0 text-red-900 bg-red-200 rounded-full px-2 h-7"
              onClick={() => setSearch("")}
            >
              clear
            </Button>
          ) : null}
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,_minmax(180px,_1fr))] gap-4">
          {search.length === 4 ? (
            <>{renderSearch(search)}</>
          ) : (
            <>
              {Object.entries(zodiacData).map(([key, value]) => (
                <Card key={value} className="bg-red-200 border-0">
                  <CardHeader>
                    <CardTitle className="text-center">{key}</CardTitle>
                  </CardHeader>
                  <CardContent>{renderTable(value)}</CardContent>
                </Card>
              ))}
            </>
          )}
        </div>
      </main>

      <footer className="py-10 text-center bg-red-900">
        <div className="container flex flex-col min-h-[150px] px-4 items-center justify-center gap-2 text-sm md:flex-row md:gap-4 md:px-6 lg:min-h-[100px]">
          <div className="grid gap-2">
            <p className="text-red-400">
              © 2024 Created by{" "}
              <a href="https://krsn.xyz" target="_blank">
                karson
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
