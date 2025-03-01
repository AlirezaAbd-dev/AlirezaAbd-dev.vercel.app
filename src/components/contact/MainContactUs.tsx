'use client';
import { ContactMail } from '@mui/icons-material';
import { Card, CardContent, Slide } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useEffect, useState } from 'react';
import HeaderDivider from '../ui/HeaderDivider';
import ContactForm from './ContactForm';
import EmailMe from './EmailMe';

export default function MainContactUs() {
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
        height: '100vh',
        background: 'background.primary',
        overflowY: 'scroll',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CardContent>
        {/* DIVIDER */}
        <HeaderDivider
          color='warning.main'
          //@ts-ignore
          icon={<ContactMail color='text.primary' />}
        >
          ارتباط با من
        </HeaderDivider>

        <Grid
          container
          sx={{ mt: 5 }}
        >
          <Slide
            direction='up'
            in={loading}
            style={{
              transitionDelay: loading ? `200ms` : '0ms',
            }}
          >
            <Grid
              size={{
                xs: 12,
                sm: 12,
                md: 8,
              }}
            >
              <Card
                sx={{
                  justifyContent: 'center',
                  alignItems: 'center',
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
}
