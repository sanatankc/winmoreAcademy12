import type { APIRoute } from "astro";
import postMCB from "./adapters/mcb/post";

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();
  const studentName = data.get("studentName") as string;
  const parentName = data.get("parentName") as string;
  const phone = data.get("phone") as string;
  const email = data.get("email") as string;
  const campus = data.get("campus") as string;
  const grade = data.get("grade") as string;
  const whatsappConsent = data.get("whatsappConsent") as string;
  const formData = new FormData();
  formData.append("Student Name", studentName);
  formData.append("Parent Name", parentName);
  formData.append("Phone", phone);
  formData.append("Email", email);
  formData.append("Campus", campus);
  formData.append("Grade", grade);
  // formData.append("sheetName", 'Users');
  formData.append("Date_Time", new Date().toLocaleString('en-GB', { timeZone: 'IST' }));
  formData.append("Whatsapp Consent", whatsappConsent === 'on' ? 'Yes' : 'No');

  // append the rest of the data to the form data object
  for (const entry of data.entries()) {
    formData.append(entry[0], entry[1]);
  }

  const sources = {
    facebook: 26,
    google: 23
  }

  const utmSource = data.get("utm_source");
  const utm_campaign = data.get("utm_campaign") || null;
  const QueryContactSourceID = sources[utmSource] || null;

  try {
    const response = await fetch('https://script.google.com/macros/s/AKfycbz3c0TfOjZtKOB4hSSLR2Iv7S4nbkIcpWk2y8DRs_Ff4vRcoiqE-9Ub8KpcAyKZBXJP/exec', {
      method: 'POST',
      body: formData
    });
    const data = await response.json();
    console.log('data', data);
  } catch (e) {
    console.error(e);
  }


  // Validate the data - you'll probably want to do more than this

  // Do something with the data, then return a success response

  return new Response(
    JSON.stringify({
      message: "Success!"
    }),
    { status: 200 }
  );
};
