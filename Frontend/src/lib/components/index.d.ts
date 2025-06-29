declare module '$lib/components/Features.svelte' {
    import { SvelteComponentTyped } from 'svelte';
    export default class Features extends SvelteComponentTyped<{}> {}
}

declare module '$lib/components/Hero.svelte' {
    import { SvelteComponentTyped } from 'svelte';
    export default class Hero extends SvelteComponentTyped<{}> {}
}

declare module '$lib/components/ProductDemo.svelte' {
    import { SvelteComponentTyped } from 'svelte';
    export default class ProductDemo extends SvelteComponentTyped<{}> {}
}

declare module '$lib/components/FAQ.svelte' {
    import { SvelteComponentTyped } from 'svelte';
    export default class FAQ extends SvelteComponentTyped<{}> {}
}

declare module '$lib/components/ui/SectionTitle.svelte' {
    import { SvelteComponentTyped } from 'svelte';
    interface SectionTitleProps {
        title: string;
        subtitle?: string;
    }
    export default class SectionTitle extends SvelteComponentTyped<SectionTitleProps> {}
}
