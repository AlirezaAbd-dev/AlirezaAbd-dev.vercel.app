"use client";

const AboutMeOtherSkills = () => {
  return (
    <Grid container>
      <Grid sx={{ width: 1, mt: 1 }}>
        <HeaderDivider
          color="primary.dark"
          animation={false}
          // @ts-ignore
          icon={<SelfImprovementRounded color="text.primary" />}
        >
          سایر مهارت ها
        </HeaderDivider>
      </Grid>
    </Grid>
  );
};

export default AboutMeOtherSkills;
