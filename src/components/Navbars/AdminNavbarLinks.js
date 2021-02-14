import React from "react";
import Button from "@material-ui/core/Button";
import app from "../../lib/Firebase";

export default function AdminNavbarLinks() {
  return (
    <div>
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => app.auth().signOut()}
      >
        Logout
      </Button>
    </div>
  );
}
