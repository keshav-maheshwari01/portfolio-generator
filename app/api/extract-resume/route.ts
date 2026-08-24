import { NextResponse } from "next/server";
import pdf from "pdf-parse/lib/pdf-parse.js";


export async function POST(req: Request) {

  try {

    const formData = await req.formData();

    const file = formData.get("file") as File;


    if (!file) {

      return NextResponse.json(
        {
          error:"No file uploaded"
        },
        {
          status:400
        }
      );

    }


    const buffer = Buffer.from(
      await file.arrayBuffer()
    );


    const result = await pdf(buffer);


    console.log(
      "PDF TEXT:",
      result.text
    );


    if(!result.text || result.text.trim().length === 0){

      return NextResponse.json(
        {
          error:"No text extracted from PDF"
        },
        {
          status:400
        }
      );

    }


    return NextResponse.json({

      text: result.text

    });


  }

  catch(error:any){

    console.error(
      "EXTRACT ERROR:",
      error
    );


    return NextResponse.json(
      {
        error:error.message
      },
      {
        status:500
      }
    );

  }

}