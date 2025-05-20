import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button
} from '@mui/material';

export default function LoginModal() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogin = () => {
    // 👉 Hier hast du Zugriff auf email und password
    console.log('Email:', email);
    console.log('Passwort:', password);

    // Beispiel: Sende die Daten an dein Backend
    // fetch('/api/login', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ email, password }),
    // });

    handleClose(); // Dialog schließen
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        Anmelden
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Anmeldung</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="E-Mail"
            type="email"
            fullWidth
            variant="standard"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Passwort"
            type="password"
            fullWidth
            variant="standard"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Abbrechen</Button>
          <Button onClick={handleLogin}>Einloggen</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
