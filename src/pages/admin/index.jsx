import { Flex, HStack, Text, VStack, Button } from "@chakra-ui/react";
import { validateToken } from "@/hooks/tokenValidation";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Sidebar from "@/components/sidebar-admin";
import { getAllDataUsers, getAllDataTodos } from "@/modules/fetch";
import Chart from "chart.js/auto";
import Link from "next/link";

const Admin = () => {
  const [totalDataUsers, setTotalDataUsers] = useState(0);
  const [totalDataTodos, setTotalDataTodos] = useState(0);
  const router = useRouter();
  useEffect(() => {
    const checkToken = async () => {
      const token = await window.localStorage.getItem("token");
      if (!token) {
        router.push("/");
      }
      const result = await validateToken(token);
      const { id, role } = result;
      console.log(id);
      if (role != "admin") {
        if (role == "user") {
          router.push("/users");
        } else {
          router.push("/");
        }
      }
    };

    const getData = async () => {
      const result = await getAllDataUsers();
      const result2 = await getAllDataTodos();
      const total = result.data.dataUser.length;
      const total2 = result2.data.length;
      setTotalDataUsers(total);
      setTotalDataTodos(total2);
    };

    const chartSumUsers = () => {
      const canvas = document.getElementById("barChart");
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      const total = totalDataUsers;

      if (canvas.chart) {
        canvas.chart.destroy();
      }
      canvas.chart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["Total Users"],
          datasets: [
            {
              label: "Jumlah Data Users",
              data: [total],
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              type: "linear",
              ticks: {
                stepSize: 1,
                precision: 0,
              },
            },
          },
        },
      });
    };

    const chartSumTodos = () => {
      const canvas = document.getElementById("todosChart");
      if (!canvas) return; 

      const ctx = canvas.getContext("2d");
      const total = totalDataTodos;

      if (canvas.chart) {
        canvas.chart.destroy();
      }

      canvas.chart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["Total Todos"],
          datasets: [
            {
              label: "Jumlah Data Todo",
              data: [total],
              backgroundColor: "#872341",
              borderColor: "#BE3144",
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              type: "linear",
              ticks: {
                stepSize: 1,
                precision: 0,
              },
            },
          },
        },
      });
    };
    checkToken();
    getData();
    chartSumUsers()
    chartSumTodos()
  }, [totalDataUsers, totalDataTodos]);

  return (
    <>
      <Flex>
        <Sidebar />
        <VStack pl={"32%"} mt={"3em"} align={"left"}>
          <Text fontSize={"3xl"} fontWeight={"bold"}>
            Selamat datang di dashboard admin.
          </Text>
          <VStack align={"left"} w={"100%"}>
            <canvas id="barChart"></canvas>
            <Link href={"/admin/data/users"}>
              <Button w={"25%"} mb={"2em"} colorScheme="green">
                Lihat Data Users
              </Button>
            </Link>
          </VStack>
          <VStack align={"left"} w={"100%"} mt={"1em"}>
            <canvas id="todosChart"></canvas>
            <Link href={"/admin/data/todos"}>
              <Button w={"25%"} mb={"2em"} colorScheme="green">
                Lihat Data Todos
              </Button>
            </Link>
          </VStack>
        </VStack>
      </Flex>
    </>
  );
};

export default Admin;
