import React from "react";
import styles from "../styles/styles.module.css";
import PostForm from "@/components/PostForm";

export default async function Posts() {
  return (
    <>
      <div className={styles.generalPostSection}>
        <PostForm />
      </div>
    </>
  );
}
