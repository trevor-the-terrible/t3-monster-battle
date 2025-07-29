export const Loader = (props: { children?: React.ReactNode, message?: string }) => {
  const { children, message } = props;
  const loadingContent = (
    children ?? (
      <p className="mt-4 text-lg text-gray-600">
        {message ?? 'Loading...'}
      </p>
    )
  )

  return (
    <div className={`
      flex flex-col items-center justify-center
      gap-4
    `}>
      <div className="
        animate-spin rounded-full
        h-16 w-16
        border-b-2 border-violet-600"
      ></div>

      {loadingContent}
    </div>
  );
};
