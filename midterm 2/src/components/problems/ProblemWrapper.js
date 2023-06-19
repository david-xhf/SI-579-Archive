const ProblemWrapper = ({children, name}) => {
  return (<section id={name.replaceAll(' ', '-')} className="container m-4 p-3 border border-dark">
    <h2>{name}</h2>
    {children}
  </section>)
}

export default ProblemWrapper
