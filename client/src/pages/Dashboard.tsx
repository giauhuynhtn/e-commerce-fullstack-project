import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import ProductsDashboard from "components/ProductsDashboard";
import MenuBar from "components/MenuBar";
import UsersDashboard from "components/UsersDashboard";
import { themePalette } from "components/ThemeProvider";
import { ThemeProvider } from "@mui/material/styles";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function Dashboard() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <ThemeProvider theme={themePalette}>
      <Box sx={{ width: "100%" }}>
        <MenuBar />

        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor='secondary'
            indicatorColor='primary'
            aria-label='basic tabs example'>
            <Tab label='Product' {...a11yProps(0)} />
            <Tab label='User' {...a11yProps(1)} />
            <Tab label='Order' {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <ProductsDashboard />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <UsersDashboard />
        </TabPanel>
        <TabPanel value={value} index={2}>
          Orders list
        </TabPanel>
      </Box>
    </ThemeProvider>
  );
}

export default Dashboard;
