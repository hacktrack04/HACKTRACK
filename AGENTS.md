<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep mock project state in a shared React provider so task edits update all decision-support views without a backend.
- Define the project context in a separate non-component module so hot updates cannot split the provider and lazy consumers into different context identities.
- Keep creation schemas in a shared browser-safe module and revalidate at the provider mutation boundary so mock form data stays consistent; invitations are mock records, not email sends.
- Keep each navigation destination as its own TanStack leaf route; share the shell and view components to maintain consistent interaction.
- Define all HackTrack visual styling and chart colors in the global semantic design system.
- Keep mock recommendation factor profiles in a pure ranking module, with scores derived from contributions, so ranking and explanations stay consistent and testable.
- Prebundle the shared shell and lazy-page UI dependencies in Vite alongside the template's React includes to prevent optimizer reloads from mixing React instances in an open preview.
