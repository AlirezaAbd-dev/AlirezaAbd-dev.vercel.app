import { useState, useEffect } from "react";
import { Card, CardContent, Slide } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { ContactMail } from "@mui/icons-material";
import { Helmet } from "react-helmet-async";

import HeaderDivider from "../components/ui/HeaderDivider";
import EmailMe from "../components/contact/EmailMe";
import ContactForm from "../components/contact/ContactForm";

const Contact = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    return () => {
      setLoading(false);
    };
  }, []);

  return (
    <Card
      sx={{
        height: "100vh",
        background: "background.primary",
        overflowY: "scroll",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Helmet>
        <title>علیرضا عابدی | ارتباط با من</title>
      </Helmet>

      <CardContent>
        {/* DIVIDER */}
        <HeaderDivider
          color="warning.main"
          icon={<ContactMail color="text.primary" />}
        >
          ارتباط با من
        </HeaderDivider>

        <Grid container sx={{ mt: 5 }}>
          <Slide
            direction="up"
            in={loading}
            style={{
              transitionDelay: loading ? `200ms` : "0ms",
            }}
          >
            <Grid xs={12} sm={12} md={8}>
              <Card
                sx={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {/* FORM */}
                <ContactForm />
              </Card>
            </Grid>
          </Slide>

          {/* MAP STANDS HERE */}
          <EmailMe />
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Contact;
