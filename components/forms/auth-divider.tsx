function AuthDivider() {
  return (
    <div aria-hidden="true" className="flex items-center gap-3">
      <span className="h-px flex-1 bg-border" />
      <span className="text-sm text-muted-foreground">o</span>
      <span className="h-px flex-1 bg-border" />
    </div>
  )
}

export { AuthDivider }
