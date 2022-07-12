import * as React from "react";
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
import AdbIcon from "@mui/icons-material/Adb";
import { deepmerge } from "@mui/utils";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@emotion/react";
import { Link } from "react-router-dom";

const pages = ["Activity", "Exercise", "Nutrition", "Sleep"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const Navbar = () => {
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

	const theme = createTheme({
		palette: {
			primary: {
				main: "#2c3f47",
			},
			secondary: {
				main: "#2c4742",
			},
		},
	});

	return (
		<ThemeProvider theme={theme}>
			<AppBar position="static" className="navbar" color="primary">
				<Container maxWidth="xxl">
					<Toolbar disableGutters className="navbar">
						<Link to="/">
							<img
								src="http://codepath-lifetracker.surge.sh/static/media/codepath.70a9a31f.svg"
								alt="logo"
							/>
						</Link>

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
								sx={{
									display: { xs: "block", md: "none" },
								}}
							>
								{pages.map((page) => (
									<MenuItem key={page} onClick={handleCloseNavMenu}>
										<Typography textAlign="center">{page}</Typography>
									</MenuItem>
								))}
							</Menu>
						</Box>
						<AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
						<Typography
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
							LOGO
						</Typography>
						<Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
							{pages.map((page) => (
								<Button
									key={page}
									onClick={handleCloseNavMenu}
									sx={{ my: 2, color: "white", display: "block" }}
								>
									<Link to={"/" + page}>{page}</Link>
								</Button>
							))}
						</Box>

						<Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>
							<Button
								onClick={handleCloseNavMenu}
								sx={{ my: 2, color: "white", display: "block" }}
							>
								<Link to="/Login">Log in</Link>
							</Button>

							<Button
								onClick={handleCloseNavMenu}
								sx={{ my: 2, color: "white", display: "block" }}
							>
								Register
							</Button>
						</Box>
					</Toolbar>
				</Container>
			</AppBar>
		</ThemeProvider>
	);
};
export default Navbar;
