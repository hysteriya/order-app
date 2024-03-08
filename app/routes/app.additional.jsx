import { Form, json, useLoaderData } from "@remix-run/react";
import {
  Box,
  Card,
  Page,
  Text,
  BlockStack,
  useBreakpoints,
  InlineGrid,
  TextField,
  Divider,
  Button,
} from "@shopify/polaris";
import { useState } from "react";
import db from '../db.server';

export async function loader() {
  let data = await db.data.findFirst();
  console.log('data', data);
  return json(data);
}

export async function action({ request }) {
  let data = await request.formData();
  data = Object.fromEntries(data);
  await db.data.upsert({
    where: {
      id: '1',
    }, // get the first record
    update:{
      id: '1',
      name: data.name,
      add:  data.add,
      company: data.company,
      title: data.title
    },
    create: {
      id: '1',
      name: data.name,
      add:  data.add,
      company: data.company,
      title: data.title
    }
  })

  return json(data);
}


export default function AppSettingsLayoutExample() {
  const { smUp } = useBreakpoints();
  const data = useLoaderData();


  const [form, setForm] = useState(data);
  return (
    <Page>
      <Form method="POST">
        <BlockStack gap={{ xs: "800", sm: "400" }}>
          <InlineGrid columns={{ xs: "1fr", md: "2fr 5fr" }} gap="400">
            <Box
              as="section"
              paddingInlineStart={{ xs: 400, sm: 0 }}
              paddingInlineEnd={{ xs: 400, sm: 0 }}
            >
              <BlockStack gap="400">
                <Text as="h3" variant="headingMd">
                  Personal Information
                </Text>
                <Text as="p" variant="bodyMd">
                  Please provide your personal information.
                </Text>
              </BlockStack>
            </Box>
            <Card roundedAbove="sm">
              <BlockStack gap="400">
                <TextField label="Name" name="name" value={form?.name} onChange={(value) => setForm({ ...form, name: value })} />
                <TextField label="Address" name="add" value={form?.add} onChange={(value) => setForm({ ...form, add: value })} />
              </BlockStack>
            </Card>
          </InlineGrid>
          {smUp ? <Divider /> : null}
          <InlineGrid columns={{ xs: "1fr", md: "2fr 5fr" }} gap="400">
            <Box
              as="section"
              paddingInlineStart={{ xs: 400, sm: 0 }}
              paddingInlineEnd={{ xs: 400, sm: 0 }}
            >
              <BlockStack gap="400">
                <Text as="h3" variant="headingMd">
                  Professional Information
                </Text>
                <Text as="p" variant="bodyMd">
                  Please provide your professional information.
                </Text>
              </BlockStack>
            </Box>
            <Card roundedAbove="sm">
              <BlockStack gap="400">
                <TextField label="Company" name="company" value={form?.company} onChange={(value) => setForm({ ...form, company: value })} />
                <TextField label="Title" name="title" value={form?.title} onChange={(value) => setForm({ ...form, title: value })} />
              </BlockStack>
            </Card>
            <br />
            <Button submit={true}>Save</Button>
          </InlineGrid>
        </BlockStack>
      </Form>
    </Page>
  )
}


