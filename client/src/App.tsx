import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Holdings from "./pages/Holdings";
import { AppBar, Toolbar, Tabs, Tab, Box } from "@mui/material";
import { useState } from "react";
import './App.css'

function NavTabs() {
  const location = useLocation();
  const [value, setValue] = useState(location.pathname);

  // Update tab value when route changes
  React.useEffect(() => {
    setValue(location.pathname);
  }, [location.pathname]);

  return (
    <AppBar position="static">
      <Toolbar>
        <Tabs value={value} onChange={(_, newValue) => setValue(newValue)} textColor="inherit" indicatorColor="secondary">
          <Tab label="Dashboard" value="/" component={Link} to="/" />
          <Tab label="Transactions" value="/transactions" component={Link} to="/transactions" />
          <Tab label="Holdings" value="/holdings" component={Link} to="/holdings" />
        </Tabs>
      </Toolbar>
    </AppBar>
  );
}

function App() {
  return (
    <Router>
      <NavTabs />
      <Box sx={{ p: 2 }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/holdings" element={<Holdings />} />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
