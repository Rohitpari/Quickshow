// import { User } from "@clerk/express";
import {User} from "../models/User.js";
import { Inngest } from "inngest";

export const inngest = new Inngest({ id: "movie-ticket-booking" });

//Inngest Function to save user to a database

const syncUserCreation = inngest.createFunction(
  { id: "sync-user-from-clerk" },
  { event: "cleark/user.created" },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } =
      event.data;
    const userData = {
      _id: id,
      email: email_addresses[0].email_address,
      name: first_name + " " + last_name,
      Image: image_url,
    };
    await User.create(userData);
  }
);

//Inngest Function to delete user from database

const syncUserdeletion = inngest.createFunction(
  { id: "delete-user-with-clerk" },
  { event: "cleark/user.deleted" },
  async ({ event }) => {
    const { id } = event.data;
    await User.findByIdAndDelete(id);
  }
);

//Inngest Function to update user data in atabase

const syncUserUpdation = inngest.createFunction(
  { id: "update-user-with-clerk" },
  { event: "cleark/user.updated" },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } =
      event.data;
    const userData = {
      _id: id,
      email: email_addresses[0].email_addresses,
      name: first_name + " " + last_name,
      Image: image_url,
    };
    // await User.FindByIdAndUpdate()
    await User.FindByIdAndUpdate(id, userData);
  }
);

export const functions = [syncUserUpdation, syncUserdeletion, syncUserCreation];
