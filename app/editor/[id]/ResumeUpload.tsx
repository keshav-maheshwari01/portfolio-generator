"use client";

import { createClient } from "@/lib/supabase/client";
import { useState } from "react";

export default function ResumeUpload({
  portfolioId,
  onDataParsed,
}: {
  portfolioId: string;
  onDataParsed?: (parsedData: any) => void;
}) {
  const supabase = createClient();

  const [photo, setPhoto] = useState<File | null>(null);
  const [resume, setResume] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [resumeName, setResumeName] = useState<string | null>(null);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [uploadingResume, setUploadingResume] = useState(false);

  async function uploadPhoto() {
    if (!photo) {
      alert("Please select a profile photo first.");
      return;
    }

    if (!photo.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    if (photo.size > 5 * 1024 * 1024) {
      alert("Profile photo must be smaller than 5MB.");
      return;
    }

    setUploadingPhoto(true);

    try {
      let photoUrl = "";
      const filePath = `${portfolioId}/profile-${Date.now()}-${photo.name}`;

      const { error: uploadError } = await supabase.storage
        .from("portfolio-media")
        .upload(filePath, photo, { upsert: true });

      if (!uploadError) {
        const { data: urlData } = supabase.storage
          .from("portfolio-media")
          .getPublicUrl(filePath);
        photoUrl = urlData.publicUrl;
      } else {
        console.warn("Storage upload warning:", uploadError.message);
      }

      const { data: portfolio, error: portfolioError } = await supabase
        .from("portfolios")
        .select("content")
        .eq("id", portfolioId)
        .single();

      if (portfolioError) {
        throw portfolioError;
      }

      const currentContent = portfolio?.content ?? {};

      const updatedContent = {
        ...currentContent,
        profile: {
          ...(currentContent.profile ?? {}),
          ...(photoUrl ? { photoUrl } : {}),
        },
      };

      const { error: updateError } = await supabase
        .from("portfolios")
        .update({
          content: updatedContent,
        })
        .eq("id", portfolioId);

      if (updateError) {
        throw updateError;
      }

      setPhoto(null);
      alert("Profile photo updated successfully!");
    } catch (error: any) {
      console.error(error);
      alert(error.message || "Profile photo update failed.");
    } finally {
      setUploadingPhoto(false);
    }
  }

  async function uploadResume() {
    if (!resume) {
      alert("Please select a resume first.");
      return;
    }

    setUploadingResume(true);

    try {
      // 1. Extract PDF text using /api/extract-resume
      const formData = new FormData();
      formData.append("file", resume);

      const extractResponse = await fetch("/api/extract-resume", {
        method: "POST",
        body: formData,
      });

      const extracted = await extractResponse.json();

      if (!extractResponse.ok || !extracted.text) {
        throw new Error(extracted.error || "Could not extract text from PDF");
      }

      // 2. Send text to Gemini via /api/parse-resume
      const aiResponse = await fetch("/api/parse-resume", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resumeText: extracted.text,
          portfolioId,
        }),
      });

      const aiData = await aiResponse.json();

      if (!aiResponse.ok || !aiData.data) {
        throw new Error(aiData.error || "AI resume parsing failed");
      }

      // 3. Upload original resume to storage (handled gracefully)
      let resumeUrl = "";
      try {
        const filePath = `${portfolioId}/resume-${Date.now()}-${resume.name}`;
        const { error: uploadError } = await supabase.storage
          .from("portfolio-media")
          .upload(filePath, resume, { upsert: true });

        if (!uploadError) {
          const { data: urlData } = supabase.storage
            .from("portfolio-media")
            .getPublicUrl(filePath);
          resumeUrl = urlData.publicUrl;
        } else {
          console.warn("Supabase storage upload skipped:", uploadError.message);
        }
      } catch (storageErr) {
        console.warn("Storage upload exception skipped:", storageErr);
      }

      // 4. Save parsed content to Supabase database
      const { data: portfolio, error: portfolioError } = await supabase
        .from("portfolios")
        .select("content")
        .eq("id", portfolioId)
        .single();

      if (portfolioError) {
        throw portfolioError;
      }

      const currentContent = portfolio?.content ?? {};

      const updatedContent = {
        ...currentContent,
        profile: {
          ...(aiData.data.profile ?? {}),
          ...(currentContent.profile ?? {}),
        },
        skills: aiData.data.skills ?? [],
        experience: aiData.data.experience ?? [],
        education: aiData.data.education ?? [],
        projects: aiData.data.projects ?? [],
        media: {
          ...(currentContent.media ?? {}),
          ...(resumeUrl ? { resumeUrl } : {}),
          resumeName: resume.name,
        },
      };

      const { error: updateError } = await supabase
        .from("portfolios")
        .update({
          content: updatedContent,
        })
        .eq("id", portfolioId);

      if (updateError) {
        throw updateError;
      }

      if (onDataParsed) {
        onDataParsed(updatedContent);
      }

      alert("Resume AI processing completed & portfolio updated!");
      setResume(null);
    } catch (error: any) {
      console.error("Upload resume error:", error);
      alert(error.message || "Resume processing failed");
    } finally {
      setUploadingResume(false);
    }
  }

  return (
    <div style={{ background: "#f1f5f9", padding: 24, borderRadius: 12, marginTop: 30 }}>
      {/* PROFILE PHOTO */}
      <div style={{ marginBottom: 30 }}>
        <h3 style={{ marginTop: 0 }}>Profile Photo</h3>
        <p style={{ color: "#64748b", fontSize: 14 }}>Upload a JPG, PNG, or WEBP profile image.</p>
        <input
          type="file"
          accept="image/*"
          onChange={(event) => {
            const file = event.target.files?.[0] || null;
            setPhoto(file);
            if (file) {
              setPhotoPreview(URL.createObjectURL(file));
            }
          }}
        />
        <br />
        <br />
        <button
          onClick={uploadPhoto}
          disabled={uploadingPhoto}
          style={{
            padding: "8px 16px",
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
          }}
        >
          {uploadingPhoto ? "Uploading Photo..." : "Upload Profile Photo"}
        </button>
        {photoPreview && (
          <img
            src={photoPreview}
            alt="preview"
            style={{
              width: 100,
              height: 100,
              borderRadius: "50%",
              objectFit: "cover",
              marginTop: 16,
              display: "block",
            }}
          />
        )}
      </div>

      {/* RESUME */}
      <div>
        <h3 style={{ marginTop: 0 }}>AI Resume Import</h3>
        <p style={{ color: "#64748b", fontSize: 14 }}>
          Upload a PDF resume to automatically populate your portfolio content using Gemini AI.
        </p>
        <input
          type="file"
          accept=".pdf"
          onChange={(event) => {
            const file = event.target.files?.[0] || null;
            setResume(file);
            if (file) {
              setResumeName(file.name);
            }
          }}
        />
        <br />
        <br />
        <button
          onClick={uploadResume}
          disabled={uploadingResume}
          style={{
            padding: "8px 16px",
            background: "#059669",
            color: "white",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
          }}
        >
          {uploadingResume ? "Processing Resume with AI..." : "Upload & Parse Resume"}
        </button>
        {resumeName && <p style={{ fontSize: 14, color: "#334155" }}>Selected Resume: {resumeName}</p>}
      </div>
    </div>
  );
}