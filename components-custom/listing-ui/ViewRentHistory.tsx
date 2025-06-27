"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageCircle, Phone } from "lucide-react";
import React from "react";
import { Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";

const ViewRentHistory = () => {
  const rentData = [
    { year: 2020, value: 0 },
    { year: 2021, value: 20 },
    { year: 2022, value: 40 },
    { year: 2023, value: 60 },
    { year: 2024, value: 80 },
    { year: 2025, value: 100 },
  ];

  const tenants = [
    {
      name: "Lanre Abidemi",
      age: 23,
      gender: "Male",
      maritalStatus: "Single",
      image: "/assets/img/jodex-tenant-img-1.jpg",
      lease: "31/12/23 - 31/12/2025",
    },
    {
      name: "Linda Danjuma",
      age: 29,
      gender: "Female",
      maritalStatus: "Single",
      image: "/assets/img/jodex-tenant-img-3.jpg",
      lease: "31/12/23 - 31/12/2025",
    },
  ];
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            Rent History
            <Tabs defaultValue="chart">
              <TabsList>
                <TabsTrigger value="data">Data</TabsTrigger>
                <TabsTrigger value="chart">Chart</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <LineChart
            width={600}
            height={250}
            data={rentData}
            className="mx-auto"
          >
            <XAxis dataKey={"year"} />
            <YAxis domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#000"
              strokeWidth={2}
              dot={{ fill: "red", r: 4 }}
            />
          </LineChart>
        </CardContent>
      </Card>

      <div>
        <h2 className="text-xl font-semibold mb-4">Tenants</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tenants.map((tenant) => (
            <Card key={tenant.name}>
              <CardContent className="flex items-center gap-4 p-4">
                <Avatar className="w-20 h-20">
                  <AvatarImage src={tenant.image} alt={tenant.name} />
                  <AvatarFallback>
                    {tenant.name.split(" ")[0][0]}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <p className="font-semibold">{tenant.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {tenant.age}, {tenant.gender}
                  </p>
                  <p className="text-sm">{tenant.maritalStatus}</p>
                  <p className="text-sm font-medium">{tenant.lease}</p>
                  <div className="flex gap-2 pt-2">
                    <Button size="icon" variant="outline">
                      <Phone size={16} />
                    </Button>
                    <Button size="icon" variant="outline">
                      <MessageCircle size={16} />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Occupancy</h2>
        <div className="space-y-1">
          <Progress value={50} className="h-2 bg-muted" />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>01/12/2021</span>
            <span>05/12/2023</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewRentHistory;
