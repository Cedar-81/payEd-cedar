import { supabase } from "../supabase/api";
import { getAccountDetail } from "./accounts";
import axios from "./axios";

type Data = {
  data: {
    data: {
      $values: {
        $id: string;
        amount: number;
        budget_Id: string;
        budget_name: string;
        dateCreated: string;
        description: string;
        status: number;
        user_Id: string;
      }[];
    };
  };
};

export async function getStreams() {
  // const data = (await axios.get(
  //   "https://payed-backend.onrender.com/api/Budgets/get-all-budget"
  // )) as Data;
  // console.log("in here", data);
  // return data.data.data.$values;

  let response = await supabase.from("Streams").select("*");
  return response;
}

export async function getStreamIncome(id: string) {
  //   const data = (await axios.get("/api/Expenses/get-all-expense")) as Data;
  //   console.log("in here", data);
  //   return data.data.data.$values;

  let response = await supabase
    .from("Incomes")
    .select("*")
    .eq("stream", parseInt(id));
  return response;
}

export async function getStreamDetail(id: string) {
  // const data = (await axios.get(
  //   "https://payed-backend.onrender.com/api/Streams/" + id
  // )) as Data;
  // console.log("in here", data);
  // return data.data.data;

  let response = await supabase
    .from("Streams")
    .select("name, amount")

    // Filters
    .eq("id", id)
    .select();

  return response;
}

export async function createStream({
  name,
  description,
  school,
}: {
  name: string;
  description: string;
  school: string;
}) {
  const response = await supabase
    .from("Streams")
    .insert([
      {
        name: name,
        description: description,
        school: parseInt(school),
      },
    ])
    .select();

  return response;
}

export async function payStream({
  amount,
  code,
}: {
  amount: string;
  code: string;
}) {
  let getincomes = await supabase
    .from("Incomes")
    .select("amount")
    .eq("code", code)
    .select();

  if (getincomes.error) {
    return getincomes.error.message;
  }
  const response = await supabase
    .from("Incomes")
    .update([
      {
        amount: parseInt(getincomes.data[0].amount) + parseInt(amount),
      },
    ])
    .eq("code", code)
    .select();

  if (response.error) return response.error.message;

  const stream = await getStreamDetail(getincomes.data[0].stream);
  if (stream.error) return stream.error.message;

  const updatedStream = await supabase
    .from("Streams")
    .update([
      {
        amount: parseInt(stream.data[0].amount) + parseInt(amount),
      },
    ])
    .eq("id", stream.data[0].id)
    .select();
  if (updatedStream.error) return updatedStream.error.message;

  const account = await getAccountDetail("1");

  if (account.error) return account.error.message;

  const updatedAccount = await supabase
    .from("Account")
    .update([
      {
        balance: parseInt(account.data[0].balance) + parseInt(amount),
      },
    ])
    .eq("id", account.data[0].id)
    .select();

  return updatedAccount;
}
