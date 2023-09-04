import { useState } from "react";
import { API_URL } from "@/utils/api";
import { Input, Button, Card, Title, Stack } from "@mantine/core";

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  amount?: string;
}

export default function Form() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    amount: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/donate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrors(errorData.errors || {});
      } else {
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          amount: ''
      });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setIsSubmitting(false);
    }
  };

  return (
    <Card withBorder shadow="xs" p="xl" bg="cyan.2">
      <Title order={1} color="blue">
        Donate
      </Title>

      <form onSubmit={handleSubmit}>
        <Stack spacing={"xs"}>
          <Input.Wrapper>
            <Input.Label>First Name</Input.Label>
            <Input name="firstName" value={formData.firstName} onChange={handleChange} />
            <Input.Error>{errors.firstName}</Input.Error>
          </Input.Wrapper>

          <Input.Wrapper>
            <Input.Label>Last Name</Input.Label>
            <Input name="lastName" value={formData.lastName} onChange={handleChange}/>
            <Input.Error>{errors.lastName}</Input.Error>
          </Input.Wrapper>

          <Input.Wrapper>
            <Input.Label>Email</Input.Label>
            <Input name="email" value={formData.email} onChange={handleChange}/>
            <Input.Error>{errors.email}</Input.Error>
          </Input.Wrapper>

          <Input.Wrapper>
            <Input.Label>Donation Amount</Input.Label>
            <Input name="amount" value={formData.amount} onChange={handleChange}/>
            <Input.Error>{errors.amount}</Input.Error>
          </Input.Wrapper>
          <Button>Submit</Button>
        </Stack>
      </form>
    </Card>
  );
}
