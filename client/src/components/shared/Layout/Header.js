import React, { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import BloodtypeIcon from "@mui/icons-material/Bloodtype";
import AdbIcon from "@mui/icons-material/Adb";
import { Link } from "react-router-dom";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import "./Header.css";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
const pages = ["Home", "About", "Contact"];
const settings = ["Logout"];

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

function Header() {
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleLogout = () => {
    localStorage.clear();
    toast.success("Logout Successfull");
    navigate("/login");
  };

  return (
    <AppBar className="bar" position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <BloodtypeIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            className="logo"
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            U-BLOOD BANK
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem className="menues" onClick={handleCloseNavMenu}>
                <Link className="typ" to="/">
                  HOME <Typography textAlign="center"></Typography>{" "}
                </Link>
                <Link className="typ" to="/About">
                  ABOUT <Typography textAlign="center"></Typography>{" "}
                </Link>
                <Link className="typ" to="/Contact">
                  CONTACT <Typography textAlign="center"></Typography>{" "}
                </Link>
                {location.pathname === "/" ? (
                  <Link className="typ" to="/analytics">
                    ANALYTICS <Typography textAlign="center"></Typography>{" "}
                  </Link>
                ) : (
                  <Link className="typ" to="/">
                    HOME <Typography textAlign="center"></Typography>{" "}
                  </Link>
                )}
              </MenuItem>
            </Menu>
          </Box>
          <AdbIcon
            className="loggo"
            sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
          />
          <Typography
            className="logosty"
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            U-COM
          </Typography>
          <Box
            sx={{
              fontSize: "20px",
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
            }}
          >
            {location.pathname === "/" ||
            location.pathname === "/donar" ||
            location.pathname === "/hospital" ? (
              <Link className="typ" to="/analytics">
                Analytics <Typography textAlign="center"></Typography>{" "}
              </Link>
            ) : (
              <Link className="typ" to="/">
                HOME <Typography textAlign="center"></Typography>{" "}
              </Link>
            )}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <StyledBadge
                  overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  variant="dot"
                >
                  <Avatar src="/broken-image.jpg" />
                </StyledBadge>

                <Typography className="username ">
                  {user?.name || user?.hospitalname || user?.organization}
                </Typography>
              </IconButton>
              <span className="badge badge-secondary !important">
                {user?.role}
              </span>
            </Tooltip>
            <Menu
              className="dropp"
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  className="menue"
                  key={setting}
                  onClick={handleCloseUserMenu}
                >
                  <li className="types" onClick={handleLogout}>
                    <Typography textAlign="center">Logout</Typography>
                  </li>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
