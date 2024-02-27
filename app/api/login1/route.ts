import { pb } from "../../../lib/pb";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import CryptoJS from "crypto-js";

const createUser = async (email, password) => {
  const hashEmail = CryptoJS.MD5(email).toString();
  const hashPassword = CryptoJS.MD5(password).toString();

  const newUser = await pb.collection("users").create({
    username: "test1",
    email: hashEmail + "@example.com",
    emailVisibility: true,
    password: hashPassword,
    passwordConfirm: hashPassword,
  });

  console.log(newUser, "new user created");
};

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { email, password } = await req.json();
    const hashEmail = CryptoJS.MD5(email).toString();
    const hashPassword = CryptoJS.MD5(password).toString();

    const authData = await pb
      .collection("users")
      .authWithPassword(hashEmail + "@example.com", hashPassword)
      .catch((error) => {
        console.error("An error occurred during login:", error);
        return null;
      });

    console.log(authData?.record, "-----authdata.record-----");

    if (pb.authStore.isValid) {
      console.log(authData, "pocketbase auth success");
      cookies().set('user' ,JSON.stringify(authData?.record), {})
        cookies().set('pb_auth' ,pb.authStore.exportToCookie(), {path : "/"})
        return NextResponse.json(
            { message: `Logged in successfully` },
            {
                headers: {

                    "Set-cookie": pb.authStore.exportToCookie(),
                },
            }
        );
    } else {
      console.log(
        "----- pocketbase'de kullanıcı bulunamadı ve yeni kullanıcı oluşturulacak ---------"
      );
      await createUser(email, password);
      console.log("New user created. Proceeding with login...");

      const authDataAfterCreation = await pb
        .collection("users")
        .authWithPassword(hashEmail + "@example.com", hashPassword);

      if (authDataAfterCreation) {
        console.log(
          authDataAfterCreation,
          "pocketbase auth success after creation"
        );
        return NextResponse.json({ status: 200, message: "login success" });
      } else {
        console.log("Authentication failed after user creation");
        return NextResponse.json({ status: 500, message: "login failed" });
      }
    }
  } catch (error) {
    console.error("An error occurred during login:", error);
    return NextResponse.json({ status: 500, message: "login failed" });
  }
}
