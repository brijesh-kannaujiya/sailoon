import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Stack from "@mui/material/Stack";
import SubMenuItem from "./SubMenuItem";
import Avatar from "@mui/material/Avatar";
import headerlogo from "../../../assets/logo_grp.png";
import uisam from "../../../assets/Winnner_Logo.svg";
import Dashboard from "../Dashboard";
import { Container } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { openDrawserS } from "../../../redux/AllapplicationStatus";
import { useSelector, useDispatch } from "react-redux";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  backgroundColor: "#320086",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },

  backgroundColor: "#320086",
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  backgroundColor: "#1F2A40",
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
  backgroundColor: "#fff",
}));

export default function Topwithslidebar() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();

  const handleDrawerOpen = () => {
    setOpen(true);
    dispatch(openDrawserS(true));
    //openDrawserS()
  };

  const handleDrawerClose = () => {
    setOpen(false);
    dispatch(openDrawserS(false));
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar sx={{ background: "#320085" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            <Container>
              <img src={headerlogo} alt="Image description" />
            </Container>
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open} sx={{ background: "#320085" }}>
        <DrawerHeader
          sx={{ justifyContent: "flex-start", background: "#320085" }}
        >
          {open ? (
            <Stack direction={"row"}>
              {/* <Avatar alt="Admin" src={uisam}  /> */}
              <img
                src={uisam}
                style={{ height: 50, width: 100 }}
                alt="Image description"
              />
              {open && (
                <Typography sx={{ m: 1, color: "#fff" }}>ADMIN</Typography>
              )}
              <IconButton
                onClick={handleDrawerClose}
                sx={{ ml: 8, color: "#fff" }}
              >
                {theme.direction === "rtl" ? (
                  <ChevronRightIcon />
                ) : (
                  <ChevronLeftIcon />
                )}
              </IconButton>
            </Stack>
          ) : (
            <Stack
              direction={"row"}
              sx={{ mt: 7.5, p: 1, background: "#320085" }}
            >
              <img
                src={uisam}
                style={{ height: 50, width: 40 }}
                alt="Image description"
              />
              {open && (
                <Typography sx={{ m: 1, color: "#fff" }}>ADMIN</Typography>
              )}
              <IconButton
                onClick={handleDrawerClose}
                sx={{ ml: 8, color: "#fff" }}
              >
                {theme.direction === "rtl" ? (
                  <ChevronRightIcon />
                ) : (
                  <ChevronLeftIcon />
                )}
              </IconButton>
            </Stack>
          )}
        </DrawerHeader>
        <Divider sx={{ backgroundColor: "#320085" }} />
        <List sx={{ backgroundColor: "#320085" }}>
          <SubMenuItem open={open} />
        </List>
        <Divider sx={{ backgroundColor: "#320085" }} />
      </Drawer>
      {/* <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
       
      </Box> */}
    </Box>
  );
}
