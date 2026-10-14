# TEKNOFIX — site institucional

Vitrine institucional de argamassas e massa de acabamento, com identidade TEKNOFIX, sete apresentações, seleção de produtos, guia de categorias, detalhes acessíveis e atendimento comercial. Sem catálogo de preços, carrinho ou pagamentos.

## Estrutura e publicação

- `public/`: página, estilos, módulos JavaScript e imagens otimizadas.
- `scripts/build.mjs`: copia o site para `dist/` e prepara canonical/sitemap quando a origem de produção está disponível.
- `scripts/check.mjs`: verifica produtos, guia, referências HTML e comportamento de criação da mensagem.
- `vercel.json`: publicação estática e cabeçalhos de segurança.

Não há dependências para compilar o site. Node 20 ou superior:

```sh
npm run check
npm run build
```

Vercel: framework `Other`, build `npm run build`, saída `dist`. A integração com `brunoxsdkl/massas-prontas` deve publicar a branch `main`. A publicação institucional em produção é destinada ao acesso público; previews podem continuar protegidos.

## Ativar o WhatsApp de Daniele

O número foi deixado para configurar depois, conforme a decisão do proprietário. Nenhum telefone de referências ou do site anterior foi reutilizado.

Em `public/site.config.js`, preencha `whatsappNumber` com o número comercial confirmado, incluindo DDI e DDD e somente dígitos. Depois de publicar o commit, o site ativa o botão flutuante e a ação de abrir o resumo no WhatsApp. O visitante revisa a mensagem antes de abrir a conversa; o formulário não envia dados a um servidor.

Não cole credenciais, tokens ou outros dados privados nesse arquivo: seu conteúdo é público. O site não utiliza analytics, cookies de rastreamento ou formulário com backend.

## Conteúdo e imagens

Apresentações solicitadas: AC1 azul e verde, AC2 laranja, AC3 roxa e Massa Pronta amarela, todas de 20 kg. A logo usa as cores originais. Os mockups foram derivados das fotos fornecidas, com alterações da classificação laranja/roxa solicitadas. São imagens de apresentação da linha, não provas das especificações ou da rotulagem técnica final.

As explicações de AC1/AC2/AC3 descrevem a finalidade geral das categorias. Não foram atribuídos ensaios, certificações, valores de consumo, cura, garantias, dimensões máximas ou compatibilidades técnicas próprias à TEKNOFIX sem ficha técnica confirmada. As fotos de referência têm informações divergentes sobre porcelanato; os textos orientam confirmar a compatibilidade na embalagem. Para uma futura ficha técnica no site, validar os dados do fabricante antes de publicá-la.

Referência geral consultada: [Orientações sobre argamassas colantes — Weber Quartzolit](https://www.quartzolit.weber/ajuda-e-dicas-para-construir/orientacoes-sobre-argamassas-colantes). Os textos são uma síntese, sem usar especificações de produtos de outro fabricante.

Não foram publicados PDFs de orçamento, contato de RealCola, endereço/CNPJ sem validação, depoimentos, números de clientes ou histórico empresarial não confirmado.

Fontes DejaVu hospedadas localmente; licença em `public/assets/fonts/LICENSE.txt`. Imagens WebP preservam a transparência e evitam dependência de serviços externos.

## Verificação

Os checks locais cobrem o catálogo, âncoras, arquivos, referências ARIA e mensagens. A navegação usa elementos nativos, abas com teclado, diálogo modal, menu com Escape e preferências de movimento reduzido. Sem o controle de navegador suportado neste ambiente, a inspeção visual de desktop/mobile não pode ser declarada como concluída. O deploy deve ser conferido também por resposta HTTP, assets e estado READY da Vercel.

## Rejunte Tipo II — 1 kg

Incluído como sétimo produto e quarto banner no carrossel automático. A apresentação contém as seis cores informadas: Cinza Platina, Preto, Branco, Areia, Marrom e Grafite, e a imagem de embalagem com visor do produto. A seleção, o diálogo e o formulário usam os dados de `public/products.js`. As imagens WebP em duas dimensões preservam transparência.

Backup anterior: branch `backup/antes-rejunte-2026-10-14`, commit `0b65b8e8c0275899d62e8cfe40e312c40805359f`, implantação `dpl_HTboJZqFJy7a9xN1DyFWNV9Ebj7W`. Para restaurar, reverta o commit de inclusão e publique no mesmo projeto `massas-prontas`.
