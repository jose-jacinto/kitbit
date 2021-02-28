// Returns the available options of a product
export function getItemVariants(product: any) {
  let groups: any = {}

  product.variant_options && product.variant_options.forEach((mainVar: any) => {
    // for each mainVar
    if (mainVar.options[0]) {
      // if has size
      if (!groups[mainVar.options[0].option_name]) {
        // if entry doesn't already exist create it
        groups[mainVar.options[0].option_name] = []
      }
      if (mainVar.options[1]) {
        // if color push it to the correct size variant
        groups[mainVar.options[0].option_name].push({
          variant_id: mainVar._id,
          ...mainVar.options[1],
        })
      } else {
        // else push only the variant_id *in case the variant only has size
        groups[mainVar.options[0].option_name].push({ variant_id: mainVar._id })
      }
    }
  })

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'] // correct order
  const sortedVariants : any = {}
  sizes.forEach((size) => {
    if (groups[size]) {
      sortedVariants[size] = groups[size]
    }
  })

  return sortedVariants
}
