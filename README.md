```html
<!-- This button will use the default palette which is the "primary" palette in this case -->
<button>My Button</button>

<!-- This class will override the "--color-xxx" css variables -->
<button class="danger">
	<i class="fa fa-xmark"></i>
	Dangerous Action
</button>

<style>
	button {
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		width: max-content;
		padding: 0.5rem 1rem;
		border-radius: 1.5rem;

		background-color: var(--color-100);
		color: var(--on-color-100);

		border: none;
		transition-property: scale, opacity;
	}

	button:active {
		opacity: 0.9;
		scale: 0.99;
	}

	button:disabled {
		pointer-events: none;
		opacity: 0.5;
	}
</style>
```
