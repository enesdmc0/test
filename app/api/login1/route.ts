import {pb} from "../../../lib/pb";
import {cookies} from "next/headers";
import {NextRequest, NextResponse} from "next/server";
import CryptoJS from "crypto-js";


const createUser = async (email: string, password: string) => {
  try {
    const hashEmail = CryptoJS.MD5(email).toString();
    const hashPassword = CryptoJS.MD5(password).toString();


    const newUser = await pb.collection("users").create({
      username: hashEmail,
      email: hashEmail + "@example.com",
      emailVisibility: true,
      password: hashPassword,
      passwordConfirm: hashPassword,
    });

    console.log(newUser, "new user created");
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("User creation failed");
  }
};


export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { email, password } = await req.json();
    const hashEmail = CryptoJS.MD5(email).toString();
    const hashPassword = CryptoJS.MD5(password).toString();

    pb.authStore.clear()

    const authData = await pb
      .collection("users")
      .authWithPassword(hashEmail + "@example.com", hashPassword)
      .catch((error) => {
        console.error("Login attempt -----authData----- Error", error);
        return null;
      });


    if (pb.authStore.isValid) {

      console.log(authData, "--------User already exists, login successful-------");
      console.log(JSON.stringify(authData?.record), "--------User already exists, login infos-------")
      cookies().set('user' ,JSON.stringify(authData?.record), {})
      cookies().set('pb_auth', pb.authStore.exportToCookie(), {path: "/"})

      return NextResponse.json({message: `Logged in successfully`}, {headers: {"Set-cookie": pb.authStore.exportToCookie()}});

    } else {

      console.log("-----User not found and New user will be created ---------");

      await createUser(email, password);

      console.log("New user created. Proceeding with login...");

      const authDataAfterCreation = await pb
        .collection("users")
        .authWithPassword(hashEmail + "@example.com", hashPassword)
          .catch((error) => {
            console.error("Login attempt -----authDataAfterCreation----- Error", error);
            return null;
          });

      if (pb.authStore.isValid) {

        console.log(authDataAfterCreation, "--------User created and login successful -------");

        cookies().set('user', JSON.stringify(authDataAfterCreation?.record), {})
        cookies().set('pb_auth', pb.authStore.exportToCookie(), {path: "/"})

        return NextResponse.json( {message: `Logged in successfully`},  {headers: {"Set-cookie": pb.authStore.exportToCookie()}}
        );
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
