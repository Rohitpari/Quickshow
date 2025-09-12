// import { User } from "@clerk/express";
import { User } from "../models/User.js";
import { Inngest } from "inngest";

export const inngest = new Inngest({ id: "movie-ticket-booking" });

// Inngest Function to save user to a database
const syncUserCreation = inngest.createFunction(
  { id: "sync-user-from-clerk" },
  { event: "clerk/user.created" },
  async ( {event} ) => {
    const { id, first_name, last_name, email_addresses, Image_url } = event.data;
    const userData = {
      _id: id,
      email: email_addresses[0].email_address,
      name: first_name + " " + last_name,
      Image: Image_url,
    };
    await User.create(userData);
  }
);

// Inngest Function to delete user from database
const syncUserdeletion = inngest.createFunction(
  { id: "delete-user-with-clerk" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    const { id } = event.data;
    await User.findByIdAndDelete(id);
  }
);

// Inngest Function to update user data in database
const syncUserUpdation = inngest.createFunction(
  { id: "update-user-with-clerk" },
  { event: "clerk/user.updated" },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, Image_url } = event.data;

    // update without trying to change _id
    await User.findByIdAndUpdate(
      id,
      {
        email: email_addresses[0].email_address,
        name: first_name + " " + last_name,
        Image: Image_url,
      },
      { new: true } // optional: returns updated doc
    );
  }
);

export const functions = [syncUserUpdation, syncUserdeletion, syncUserCreation];
