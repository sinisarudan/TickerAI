<template>
	<div>
		<DialogCS :options="dialogOptions"></DialogCS>
		<v-card>
			<v-card-title class="personalize">
				<div>Personalize your News</div>
			</v-card-title>

			<v-card-text class="card-pref">
				<NewsPreferencesComponent @preferencesSettingFinished="preferencesSettingFinished" @canceled="canceled" />
			</v-card-text>

			<v-divider></v-divider>

			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn v-if="preferencesFinished" color="primary" text @click="closePreferences()">Back to News</v-btn>
				<!-- UX.1.0 <v-btn v-if="!preferencesFinished" color="primary" text @click="cancelPrefSetting()">Cancel</v-btn> -->
			</v-card-actions>
		</v-card>
	</div>
</template>

<style lang="scss" scoped>
@import "../../variables";

.card-pref {
	padding: 0px !important;
}

.personalize {
	text-transform: uppercase;
	border-bottom: 3px #333333 solid;
	padding: 12px 0px;
	font-weight: bold;
	color: $main-color !important;
	position: relative;
}
</style>

<script lang="ts" src="./Preferences.ts"></script>
