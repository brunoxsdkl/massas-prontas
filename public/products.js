export const products = Object.freeze([
  {
    id: 'ac1-azul', category: 'AC1', colorName: 'Azul', color: '#0075c9', softColor: '#e5f1fa',
    name: 'AC1 Azul', label: 'O começo de uma boa base.', context: 'Assentamento · Cerâmicas · Áreas internas',
    description: 'Para assentar revestimentos cerâmicos em ambientes internos. Uma categoria voltada ao dia a dia de pisos e paredes, com a apresentação azul da linha TEKNOFIX.',
    uses: ['Revestimentos cerâmicos', 'Pisos e paredes internos', 'Apresentação de 20 kg'],
    caution: 'Para porcelanatos, bases especiais ou grandes formatos, confirme a compatibilidade específica na embalagem antes de aplicar.',
  },
  {
    id: 'ac1-verde', category: 'AC1', colorName: 'Verde', color: '#11834b', softColor: '#e6f2e9',
    name: 'AC1 Verde', label: 'A mesma categoria. Outra identidade.', context: 'Assentamento · Cerâmicas · Áreas internas',
    description: 'A apresentação verde da categoria AC1 TEKNOFIX. Indicada, de modo geral, para cerâmicas em áreas internas; o preparo e os limites de aplicação devem seguir a embalagem.',
    uses: ['Revestimentos cerâmicos', 'Pisos e paredes internos', 'Apresentação de 20 kg'],
    caution: 'As cores identificam as apresentações da linha. Não indicam, por si só, diferenças de formulação ou rendimento.',
  },
  {
    id: 'ac2-laranja', category: 'AC2', colorName: 'Laranja', color: '#ea6411', softColor: '#fff0e3',
    name: 'AC2 Laranja', label: 'Sua obra encontra o lado de fora.', context: 'Assentamento · Exposição · Versatilidade',
    description: 'A categoria AC2 é voltada a assentamentos sujeitos a variações de temperatura e umidade, como áreas externas. Confira na embalagem os revestimentos e as bases compatíveis com este produto.',
    uses: ['Projetos com exposição ao tempo', 'Variações de temperatura e umidade', 'Apresentação de 20 kg'],
    caution: 'Piscinas, fachadas, pisos aquecidos e outras aplicações especiais exigem confirmação técnica específica.',
  },
  {
    id: 'ac3-roxa', category: 'AC3', colorName: 'Roxa', color: '#7139a7', softColor: '#f0e9f7',
    name: 'AC3 Roxa', label: 'Quando o projeto pede mais aderência.', context: 'Assentamento · Maior aderência · Projetos exigentes',
    description: 'A categoria AC3 oferece maior aderência para assentamentos mais exigentes. A escolha para porcelanatos e outros revestimentos depende também da base, do formato da peça e das indicações da embalagem.',
    uses: ['Assentamentos de maior exigência', 'Escolha conforme revestimento e base', 'Apresentação de 20 kg'],
    caution: 'A classificação AC3 não autoriza automaticamente qualquer formato ou aplicação. Verifique as condições de uso do produto.',
  },
  {
    id: 'massa-pronta', category: 'Massa pronta', colorName: 'Amarela', color: '#edc900', softColor: '#fff8d8',
    name: 'Massa Pronta', label: 'O detalhe que dá forma ao acabamento.', context: 'Acabamento · Superfícies · Praticidade',
    description: 'A linha amarela é dedicada ao acabamento fino de superfícies. A embalagem apresenta aplicação prática e uso interno e externo, sempre conforme o preparo e as condições indicados no produto.',
    uses: ['Acabamento fino de superfícies', 'Uso interno e externo conforme embalagem', 'Apresentação de 20 kg'],
    caution: 'Confirme o substrato, o preparo e a espessura permitida. Massa de acabamento e argamassa colante têm funções diferentes.',
  },
]);

export const guideChoices = Object.freeze({
  interior: { productId: 'ac1-azul', title: 'Conheça a categoria AC1', text: 'Para começar a escolha de cerâmicas em pisos e paredes internos. As apresentações azul e verde pertencem à categoria AC1.' },
  exterior: { productId: 'ac2-laranja', title: 'Conheça a categoria AC2', text: 'Para projetos com variações de temperatura e umidade. Confirme na embalagem a indicação para o seu ambiente e revestimento.' },
  demanding: { productId: 'ac3-roxa', title: 'Conheça a categoria AC3', text: 'Para projetos que exigem maior aderência. Porcelanatos e formatos especiais precisam de compatibilidade confirmada para cada aplicação.' },
  finishing: { productId: 'massa-pronta', title: 'Conheça a Massa Pronta', text: 'Para acabamento fino de superfícies. Confira o preparo e o substrato antes de iniciar a aplicação.' },
});
