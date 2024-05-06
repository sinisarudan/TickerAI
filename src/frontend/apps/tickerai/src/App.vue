<template>
	<v-app>
		<img src="/img/logos/tickerAI-logo.png" class="topLogo" />
		<LogoMottoComponent class="motto" />
		<!-- Sizes your content based upon application components -->
		<v-main>
			<!-- Provides the application the proper gutter -->
			<v-container fluid>
				<div id="app">
					<link rel="stylesheet" href="//fonts.googleapis.com/css?family=Roboto:400,500,700,400italic|Material+Icons" />
					<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />

					<!-- right side bar with news preferences, and settings -->
					<!-- <aside is="ColaboMaterial" type="drawer" :info="{ position: 'right', activeGet: () => myNewsPrefDrawerOpen, activeSet: (isOpen) => (myNewsPrefDrawerOpen = isOpen) }" class="drawer_lists">
						<MyPreferencesComponent :marketsAspectsSelections="marketsAspectsSelections" @closed="closeMyNewsPrefDrawer()" @edit="editMyPreferences()" />
					</aside> -->

					<div class="main-container">
						<main class="main-content">
							<!-- {{ test }} -->
							<!-- <div>DEBUG: preferencesStatus {{ this.storeNews.state.myPreferences.preferencesStatus }}, isPrefSettingUpFinishedOnce {{ this.storeNews.state.myPreferences.isPrefSettingUpFinishedOnce }}, activeMarketIndex {{ this.store.state.myPreferences.activeMarketIndex }}<BR />showMyNewsPortfolioBtn {{ showMyNewsPortfolioBtn }}, myNewsPrefDrawerOpen {{ myNewsPrefDrawerOpen }}, showPreferencesSettingsBtn {{ showPreferencesSettingsBtn }}. preferencesDialog {{ preferencesDialog }}<BR /> prefSettingCanceled {{ this.prefSettingCanceled }}</div> -->

							<div v-if="showDailyRundown" class="headings">
								<div class="title">Daily Rundown:</div>
								<!-- headings: {{ JSON.stringify(headings) }} -->
								<div v-if="headings.topEarnings" class="heading">
									Earnings: <span class="heading-part" v-for="hd in parseHeading(headings.topEarnings)" :key="hd">{{ hd }}</span>
								</div>
								<div v-if="headings.topMovers" class="heading">
									Movers: <span class="heading-part" v-for="hd in parseHeading(headings.topMovers)" :key="hd">{{ hd }}</span>
								</div>
								<div v-if="headings.topTechnicals" class="heading">
									Technicals: <span class="heading-part" v-for="hd in parseHeading(headings.topTechnicals)" :key="hd">{{ hd }}</span>
								</div>
							</div>

							<!-- NEWS PREFERENCES BUTTON -->
							<v-btn v-if="showPreferencesSettingsBtn" class="personalize-btn" @click="openPreferences()">
								<!-- @Joe doesn't want this icon <icon class="personalize-btn-icon" is="ColaboMaterial" type="icon" :info="{ size: 1 }">tune</icon> -->
								PERSONALIZE NEWS
							</v-btn>

							<!-- MY NEWS PORTFOLIO DIALOGUE AND BUTTON -->
							<v-btn v-if="showMyNewsPortfolioBtn" class="show-personalize-btn-icon" @click="myNewsPrefDrawerOpen = true">
								<icon class="show-personalize-btn-icon" is="ColaboMaterial" dark :info="{ size: 1 }" type="icon">tune</icon>
							</v-btn>

							<v-btn v-if="showLoginRegisterBtn && !isUserLoggedIn" class="account-btn" to="/account"> <icon class="account-btn-icon" is="ColaboMaterial" type="icon" :info="{ size: 1 }">manage_accounts</icon>{{ accountText }}</v-btn>

							<v-btn v-if="showLoginRegisterBtn && isUserLoggedIn" class="account-initials-btn" icon to="/account">{{ userInitials }}</v-btn>

							<!-- <v-btn v-if="showMyNewsPortfolioBtn" @click="myNewsPrefDrawerOpen = true"> <icon is="ColaboMaterial" type="icon" :info="{ size: 1 }">tune</icon></v-btn> -->
							<v-dialog v-model="myNewsPrefDrawerOpen" width="90%" :fullscreen="$vuetify.breakpoint.xsOnly" transition="dialog-bottom-transition">
								<v-card>
									<MyPreferencesComponent :marketsAspectsSelections="marketsAspectsSelections" @closed="myNewsPrefDrawerOpen = false" @edit="editMyPreferences()" @clean="cleanMyPreferences()" />
									<!-- <v-card-title class="text-h5 grey lighten-2">News Personalization</v-card-title>

							<v-card-text>
								<NewsPreferencesComponent />
							</v-card-text>

							<v-divider></v-divider>

							<v-card-actions>
								<v-spacer></v-spacer>
								<v-btn color="primary" text @click="preferencesDialog = false"> {{ preferencesFinished ? "Close" : "Cancel" }} </v-btn>
							</v-card-actions> -->
								</v-card>
							</v-dialog>
							<!-- <div id="nav"><router-link to="/">Home</router-link> | <router-link to="/preferences">Preferences</router-link> | <router-link to="/news">News</router-link></div> -->
							<router-view @personalizeNews="personalizeNews()" />
						</main>
					</div>

					<div class="header_logos">
						<!-- <div id="btn-changeTheme" class="annotata-logo">
							<a href="https://retracingconnections.org/" target="_blank">
								<img src="https://retracingconnections.org/wp-content/uploads/2021/04/LOGO-RT-new.png" />
							</a>
						</div> -->
					</div>

					<div class="footer_logos">
						<!-- <span class="info">powered by:</span>
						<div class="colabo-space-logo">
							<a href="https://colabo.space" target="_blank">
								<img src="/img/logos/colabo-logo-with-url.png" />
							</a>
						</div>
						<div class="colaboflow-logo">
							<a href="https://colabo.space/flow" target="_blank">
								<img src="/img/logos/ColaboFlow - logo.png" />
							</a>
						</div>
						<div class="datatalks-logo">
							<a href="https://colabo.space/knalledge" target="_blank">
								<img src="/img/logos/DataTalks - Logo.png" />
							</a>
						</div> -->
					</div>
					<!-- <v-bottom-sheet v-model="myNewsPrefDrawerOpen">
						<v-sheet class="text-center">
							<MyPreferencesComponent :marketsAspectsSelections="marketsAspectsSelections" @closed="closeMyNewsPrefDrawer()" @edit="editMyPreferences()" />
						</v-sheet>
					</v-bottom-sheet> -->
					<!-- <v-navigation-drawer v-model="myNewsPrefDrawerOpen" bottom right temporary>
						<MyPreferencesComponent :marketsAspectsSelections="marketsAspectsSelections" @closed="closeMyNewsPrefDrawer()" @edit="editMyPreferences()" />
					</v-navigation-drawer> -->
					<v-snackbar v-model="snackbar" :timeout="snackbarTimeout">
						{{ snackbarMsg }}
						<!-- <template v-slot:action="{ attrs }"> -->
						<v-btn @click="snackbarClose">OK</v-btn>
						<!-- </template> -->
					</v-snackbar>
				</div>
			</v-container>
		</v-main>
	</v-app>
</template>
<style lang="scss">
.v-snack__content {
	padding: 0px;
	padding-left: 10px;
}
.v-navigation-drawer {
	min-width: 400px !important;
	max-width: 600px !important;
}
.v-navigation-drawer__content {
	width: 100% !important;
}
.md-tab-my-pref {
	width: 200px !important;
}

.v-btn {
	margin: 5px;
}

.div-tabs {
	/* width: 400px !important; */
	/* overflow: scroll !important; */
}
/* .md-scrollable-navigation {
	overflow: scroll !important;
} */
</style>

<style lang="scss">
@import "variables";
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: $main-color; //used to be: #2c3e50;

	@media (min-width: $mobile-desktop-threshold) {
		.topLogo {
			width: 85px;
			margin-top: 7px;
			margin-left: 12px;
		}
	}
	@media (max-width: $mobile-desktop-threshold) {
		.topLogo {
			width: 55px;
			margin-top: 7px;
			margin-left: 12px;
		}
	}

	.motto {
		margin-left: 7px;
	}

	.headings {
		display: flex;
		background: rgba($header-bg-color, 0.1);
		text-align: left;
		font-family: "Times New Roman", Times, serif !important;
		@media only screen and (max-width: $mobile-desktop-threshold) {
			flex-direction: column;
			align-items: flex-start;
		}
		@media only screen and (min-width: $mobile-desktop-threshold) {
			// flex-direction: row;
			flex-direction: row;
		}
		.title {
			font-weight: bold;
			font-size: 16px !important;
			margin-right: 23px;
			// text-decoration: underline;
		}
		.heading {
			margin-top: 5px;
			margin-right: 15px;
			.heading-part {
				background: rgba($header-bg-color, 0.2);
				padding: 3px 6px;
				border-radius: 2px;
				margin: 0px 2px;
			}
		}
	}

	.selection {
		border-radius: $border-radius;
		font-weight: bold;
		font-size: $font-size;
		background: rgba(86, 119, 172, 0.15);
		color: $main-color-dark;
		height: 28px;
		overflow: visible !important;
		margin: 5px !important;
		// border: 1px solid $main-color;
		// filter: drop-shadow(5px 5px 4px gray);
	}

	.md-toggle {
		background: $main-color !important;
		color: $bg-color !important;
		font-size: $font-size + 1;
	}

	.button-general {
		border-radius: $border-radius;
		font-weight: bold;
		font-size: $font-size;
		background: $main-color-dark !important;
		height: 28px;
		color: $bg-color !important;
		margin: 5px !important;
		// border: 1px solid $main-color;
		// filter: drop-shadow(5px 5px 4px gray);
	}

	h1 {
		color: red;
	}

	h2 {
		font-family: "Playfair Display", sans-serif;
	}

	.hltu {
		color: $highlight-color;
		text-transform: uppercase;
	}

	.personalize-btn {
		color: white !important;
		margin: 5px;
		background: $header-bg-color !important;
		font-weight: bolder;
		border-radius: 4px;
		.personalize-btn-icon {
			color: white !important;
			margin-right: 5px;
		}
	}

	.account-btn {
		color: $bg-color !important;
		margin: 5px;
		background: $header-bg-color;
		font-weight: bolder;
		border-radius: 4px;
		.account-btn-icon {
			color: $bg-color !important;
			margin-right: 5px;
		}
	}

	.account-initials-btn {
		color: $bg-color !important;
		margin: 5px;
		background: $header-bg-color;
		font-weight: bolder;
		// border-radius: 4px;
	}

	.show-personalize-btn-icon {
		color: white !important;
		margin-right: 5px;
		background: $header-bg-color;
		font-weight: bolder;
	}

	.controls_top_right {
		position: absolute;
		top: 50px;
		right: 0px;
		.md-icon {
			color: $main-color !important;
		}

		// z-index: 1000;
	}

	.header_logos {
		width: 225px;
		position: absolute;
		right: 25px;
		top: 5px;
		img {
			position: relative;
			width: 100px;
			height: 100px;
			margin: 3px;
			border-radius: 7px;
			// https://www.w3schools.com/cssref/css3_pr_box-shadow.asp
			// this is more resource-optimized approach
			// https://tobiasahlin.com/blog/how-to-animate-box-shadow/
			// DOESN'T work?! ::before when hovered in dev-tool doesn't show a blue shaddow and in the example: https://alligator.io/css/transition-box-shadows/ it does
			box-shadow: 3px 3px 3px -1px #aaa;
			/* Pre-render the bigger shadow, but hide it */
			&::before {
				box-shadow: 3px 3px 5px -1px #aaa;
				opacity: 1;
				transition: opacity 0.3s ease-in-out;
				content: "";
				position: absolute;
				z-index: -1;
				top: 0;
				right: 0;
				bottom: 0;
				left: 0;
				border-radius: 7px;
			}
			/* Transition to showing the bigger shadow on hover */
			&:hover::before {
				opacity: 1;
			}
		}
	}

	.footer_logos {
		width: 500px;
		position: absolute;
		text-align: right;
		right: 25px;
		bottom: 5px;
		.info {
			color: red;
			font-style: italic;
		}
		div {
			display: inline-block;
		}
		img {
			position: relative;
			// width: 75px;
			height: 50px;
			margin: 3px;
			border-radius: 7px;
			// https://www.w3schools.com/cssref/css3_pr_box-shadow.asp
			// this is more resource-optimized approach
			// https://tobiasahlin.com/blog/how-to-animate-box-shadow/
			// DOESN'T work?! ::before when hovered in dev-tool doesn't show a blue shaddow and in the example: https://alligator.io/css/transition-box-shadows/ it does
			box-shadow: 3px 3px 3px -1px #aaa;
			/* Pre-render the bigger shadow, but hide it */
			&::before {
				box-shadow: 3px 3px 5px -1px #aaa;
				opacity: 1;
				transition: opacity 0.3s ease-in-out;
				content: "";
				position: absolute;
				z-index: -1;
				top: 0;
				right: 0;
				bottom: 0;
				left: 0;
				border-radius: 7px;
			}
			/* Transition to showing the bigger shadow on hover */
			&:hover::before {
				opacity: 1;
			}
		}

		.colabo-space-logo {
			display: inline;
			opacity: 0.5;
		}

		.colaboflow-logo {
			display: inline;
			opacity: 0.5;
		}
		.datatalks-logo {
			display: inline;
			opacity: 0.5;
		}
	}
}

#nav {
	padding: 30px;

	a {
		font-weight: bold;
		color: #2c3e50;

		&.router-link-exact-active {
			color: #42b983;
		}
	}
}

.inversed {
	background-color: $main-color !important;
	color: $bg-color !important;
}
</style>

<script lang="ts" src="./App.ts"></script>
