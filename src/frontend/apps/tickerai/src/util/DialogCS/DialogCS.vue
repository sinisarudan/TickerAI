<template>
	<div class="dialog-cs">
		<!-- <span>DialogCS-test</span> -->
		<v-dialog class="dialog" v-model="showDialog" max-width="500px" :fullscreen="$vuetify.breakpoint.xsOnly" :persistent="options && options.persistent" transition="dialog-bottom-transition">
			<!-- dialog.... -->
			<v-card class="dialog-styling inversed">
				<!-- dialog....2 -->
				<v-card-title class="title">{{ options ? options.title : "" }}</v-card-title>
				<!-- dialog....3 {{ JSON.stringify(options) }} dialog....4 -->
				<div class="dtext">{{ options ? options.text : "" }}</div>
				<v-divider></v-divider>

				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="primary" v-if="options && options.btn1Msg" text @click="btnClicked(1)">{{ options ? options.btn1Msg : "" }}</v-btn>
					<v-btn color="primary" v-if="options && options.btn2Msg" text @click="btnClicked(2)">{{ options ? options.btn2Msg : "" }}</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss"></style>

<style lang="scss" scoped>
@import "../../variables";

.dtext {
	padding: 10px;
	font-size: 16px;
}

.dialog-styling {
	font-size: 14px;
	.title {
		color: $header-bg-color !important;
		font-weight: bold;
		font-size: 16px;
		background-color: $light-main-color !important;
	}
	button {
		color: $header-bg-color !important;
		font-weight: bold;
		background-color: $light-main-color !important;
		&:hover {
			background-color: $light-border-color !important;
		}
	}
}
</style>

<script lang="ts" src="./DialogCS.ts"></script>
