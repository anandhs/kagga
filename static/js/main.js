const menuButton = document.querySelector('.menu-toggle')
const navigation = document.querySelector('.site-nav')

menuButton?.addEventListener('click', () => {
  const open = navigation?.classList.toggle('open') ?? false
  menuButton.setAttribute('aria-expanded', String(open))
})

const filter = document.querySelector('#comic-filter')
const cards = [...document.querySelectorAll('#comic-grid .comic-card')]
const filterStatus = document.querySelector('#filter-status')

filter?.addEventListener('input', () => {
  const query = filter.value.toLocaleLowerCase().trim()
  let visible = 0
  cards.forEach((card) => {
    const match = !query || card.dataset.search.includes(query)
    card.hidden = !match
    if (match) visible += 1
  })
  if (filterStatus) filterStatus.textContent = query ? `${visible} matching comic${visible === 1 ? '' : 's'}` : ''
})

