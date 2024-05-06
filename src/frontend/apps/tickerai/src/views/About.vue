<template>
	<div class="about">
		<h1>ColaboFlow Workshop</h1>

		The list of technologies:

		<h2>Colabo.Space</h2>

		<p>Colabo.Space is socio-technologically augmented ecosystem for collaboration and augmentation of scientific and creative communities and group processes. It is continuosely improved in an agile way through research work, conducting workshops and adopting newests socio-technological trends.</p>
		<p><a target="_blank" href="https://colabo.space/en/home/">READ MORE</a></p>

		<h2>ColaboFlow</h2>

		<p>ColaboFlow, a methodology / framework to describe systems through social-processes. In such way, we are able to rapidly redesign, recognize behavioral patterns and tune the system presence to needs of community or system providers (like GLAM institutions, schools, etc). Considering visual model aspect, it aims to be the social extension of BPMN.</p>
		<p><a target="_blank" href="https://colabo.space/en/flow/">READ MORE</a></p>

		<h2>DataTalks</h2>

		<p>DataTalks enables declarative and implementation-agnostic knowledge types.</p>
		<p>It helps developing application in a declarative manner where data types are described through `schemas` and let unfold the majority of the application automatically</p>

		<p><a target="_blank" href="https://colabo.space/en/knalledge/">READ MORE</a></p>

		<h2>ColaboMaterial Components</h2>

		<p>ColaboMaterial Components are <b>Headless Components</b> are implementation agnostic components.</p>
		<p>They are also <b>semantic</b> components where features and preferences are described to strongly typed interfaces.</p>
		<p class="comment">As such, they are easier to use and set preferences <b>without memorizing</b> attributes, classes and tag names. They are also easy to re-implement and <b>reuse another components implementation</b> (for example Vuetify instead of Vue material, etc), or completely <b>change the framework</b> (Vue instead of Angular)</p>

		<p><router-link to="/colabo-material">DEMO</router-link></p>
	</div>
</template>

<style lang="scss" scoped>
.about {
	margin: auto;
	max-width: 500px;

	.comment {
		color: #aaa;
		text-align: justify;
	}
}
</style>
