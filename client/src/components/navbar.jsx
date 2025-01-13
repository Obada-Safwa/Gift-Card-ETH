"use client";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Link from "next/link";
import { getContract } from "@/utils/web3";
import { getFromLocalStorage } from "@/utils/help";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [myData, setMyData] = useState(null);

  useEffect(() => {
    const init = async () => {
      const contract = await getContract();
      const addresses = getFromLocalStorage("addresses");
      if (!addresses) return;

      const registered = await contract.methods.isRegistered().call({
        from: addresses[0],
      });
      if (!registered) return;

      const data = await contract.methods.getMyData().call({
        from: addresses[0],
      });

      setMyData(data);
    };

    init();
  }, []);

  return (
    <AppBar position="static" sx={{ backgroundColor: "purple" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              letterSpacing: "0.2rem",
            }}
          >
            GiftCard Shop
          </Typography>
          <div className="flex flex-row gap-4 items-center">
            <Link
              href="/giftcards"
              className="text-white hover:bg-white/10 transition-all duration-200 rounded-md px-4 py-2 flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="2" y="6" width="20" height="12" rx="2" />
                <path d="M22 10H2" />
                <path d="M7 15h.01" />
                <path d="M11 15h2" />
              </svg>
              My Gift Cards
            </Link>
            <Box
              sx={{
                flexGrow: 0,
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              {myData && (
                <Typography
                  variant="body1"
                  sx={{
                    color: "white",
                    fontFamily: "monospace",
                  }}
                >
                  {myData.name}
                </Typography>
              )}
              <IconButton sx={{ p: 0 }}>
                <Avatar
                  alt={`${myData?.name || "Profile"} Avatar`}
                  src={
                    myData && myData.gender === 0n
                      ? "https://cdn-icons-png.flaticon.com/512/4140/4140047.png"
                      : "https://cdn-icons-png.flaticon.com/512/4140/4140048.png"
                  }
                  sx={{ width: 40, height: 40 }}
                />
              </IconButton>
            </Box>
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
