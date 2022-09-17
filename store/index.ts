import getNavigation from '~/graphql/getNavigation.gql';
import { client } from '~/apollo/client';

export const state = () => ({
  swipingLocked: false,
  lang: 'pl-PL',
  links: [],
});

export const getters = {
  swipingLocked(state) {
    return state.swipingLocked;
  },
  lang(state) {
    return state.lang
  },
  getLinks(state) {
    return state.links
  }
}

export const mutations = {
  lock(state) {
    state.swipingLocked = true;
  },
  unlock(state) {
    state.swipingLocked = false;
  },
  setLang(state, lang) {
    state.lang = lang;
  },
  setLinks(state, links) {
    state.links = [...links];
  },
}

export const actions = {
  async nuxtServerInit({ commit }, { req }) {
    const { data } = await client.query({query: getNavigation});

    const links = data.allNavigations.edges[0].node.items.map(x => x.link[0].text);
    const pl = data.allNavigations.edges[0].node.items.map(x => x.pl[0].text);
    const en = data.allNavigations.edges[0].node.items.map(x => x.en[0].text)

    const finalLinks = links.map((link, i) => ({
      link,
      pl: pl[i],
      en: en[i]
    }));
    commit('setLinks', finalLinks);
  }
}
