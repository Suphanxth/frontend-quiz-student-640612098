import { API_URL } from "../utils/api";
import { type Donation } from "@/utils/types";
import { Paper, Text, Stack, Group, Title, Card } from "@mantine/core";
import dayjs from "dayjs";
import { FC, useEffect, useState } from "react";

export default function Donation() {
  const [donations, setDonations] = useState<Donation[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`${API_URL}/donation`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (res.ok) {
          const data = (await res.json()) as Donation[];
          setDonations(data);
        } else {
          console.error("Failed to fetch data from server.");
        }
      } catch (error) {
        console.error("An error occurred while fetching data:", error);
      }
    }

    fetchData();
  }, []);

  const totalAmount = donations.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <Card withBorder shadow="xs" bg="gray.3">
      <Group mb={20}>
        <Title order={1} color="gray">
          Total
        </Title>
        <Title order={1} variant="gradient">
          {totalAmount}
        </Title>
        <Title order={1} color="gray">
          THB
        </Title>
      </Group>
      <Stack>
      {donations.length > 0 ? (
          donations.map((donation) => (
            <Paper key={donation.id} shadow="xs" p="md">
              <Group>
                <Text>{donation.firstName}</Text>
                <Text>{donation.lastName}</Text>
                <Text>{donation.email}</Text>
                <Text>{donation.amount}</Text>
                <Text>{dayjs(donation.time).format("D-MMM HH:mm:ss")}</Text>
              </Group>
            </Paper>
          ))
        ) : (
          <p>Loading donor data...</p>
        )}
      </Stack>
    </Card>
  );
}

