'use strict';

// definicja funkcji (bez wykonania)
function titleClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  console.log('titleClickHandler event:', event);

  /* [DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */            /*3*/
  // console.log('clickedElement:', clickedElement);
  clickedElement.classList.add('active');


  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.post');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }

  /*[DONE] get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');
  // console.log('Link was clicked ', articleSelector);               /*4*/

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */

  const targetArticle = document.querySelector('article' + articleSelector);
  console.log('target article:', targetArticle);                /*5*/

  /*[DONE] add class 'active' to the correct article */
  targetArticle.classList.add('active');
}

// utworzenie zmiennych
const 
  optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  optTagsListSelector = '.tags.list',
  optCloudClassCount = 5,
  optAuthorsListSelector = '.authors.list',
  optCloudClassPrefix = 'tag-size-';

// definacji funkcji
function generateTitleLinks(customSelector = ''){
  console.log('generateTitleLinks selector used: ', optTitleListSelector + customSelector);

  /* [DONE] remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  // console.log('titleList:', titleList);
  titleList.innerHTML = '';

  /* find all the articles and save them to variable: articles */
  
  let html = '';

  // const articles = document.querySelectorAll(optArticleSelector);
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  console.log('articles:', articles);


  for(let article of articles){
    
    /* [DONE] get the article id */
    const articleId = article.getAttribute('id');

    /* [DONE] find the title element */
    // const optArticleSelector = document.querySelector('.post');

    /* [DONE] get the title from the title element */
    const optTitleListSelector = document.querySelector('.titles');
    
    /* [DONE] create HTML of the link */ 
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
  
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';   
    // console.log('<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>');    /*1*/

    /* [DONE] insert link into titleList */
    optTitleListSelector.insertAdjacentHTML('afterbegin', linkHTML);

    html = html + linkHTML;
    // console.log(html);     /*2*/
  }

  titleList.innerHTML = html;

}

generateTitleLinks();

// wyszukaj linki pasujace do selectora i wypisz w konsoli
const links = document.querySelectorAll('.titles a');
console.log('links:', links);                /*Nodelist*/

for(let link of links){
  link.addEventListener('click', titleClickHandler);
}


function calculateTagsParams(tags){

  let params = {max:0, min:999999};


  for(let tag in tags){
    console.log(tag + ' is used ' + tags[tag] + ' times');
    params.max = Math.max(tags[tag], params.max);
    params.min = Math.min(tags[tag], params.min);
  }

  
  

  return params;
}

function calculateTagClass(count, params){
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;

  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );
  console.log('classNUmber:', classNumber);
  // console.log('optCloudClassPrefix+classNumber:', optCloudClassPrefix+classNumber)
  

  // return optCloudClassPrefix+classNumber
  return classNumber;
}


function generateTags(){

  let allTags = {};

  /* [DONE] remove contents of titleList */
  const titleList = document.querySelector('body > div > div > main > aside:nth-child(3) > ul.list.tags');
  titleList.innerHTML = '';


  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  // console.log(articles);

  /* START LOOP: for every article: */
  for(let article of articles){
  
    /* find tags wrapper */    
    // const titleList = article.querySelector(optArticleTagsSelector);
    // console.log(titleList);

    /* make html variable with empty string */
    let html = '';
    // console.log(html);

    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    // console.log('Link was clicked ', articleTags); 

    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    // console.log(articleTagsArray);

    /* START LOOP: for each tag */
    for(let tag of articleTagsArray){
      // console.log(tag);
      
      /* generate HTML of the link */
      const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>\n';
      // console.log('<li><a href="#tag-' + tag + '">' + tag + '</a></li>');

      const optArticleTags = article.querySelector(optArticleTagsSelector);

      optArticleTags.insertAdjacentHTML('afterbegin', linkHTML);

      /* add generated code to html variable */
      html = html + linkHTML;
      // console.log(html)
      
      /* [NEW] check if this link is NOT already in allTags */
      // if(allTags.indexOf(linkHTML) == -1){
      //   /* [NEW] add generated code to allTags array */
      //   allTags.push(linkHTML);}
    

      if(!allTags.hasOwnProperty(tag)){
        allTags[tag]=1;
      } else {
        allTags[tag]++;
      }
      console.log(allTags);
    
    }
    /* END LOOP: for each tag */ 






    /* insert HTML of all the links into the tags wrapper */
    // const tagsList = document.querySelector('');
    
    /* END LOOP: for every article: */
  
  }
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(optTagsListSelector);

  /* [NEW] add html from allTags to tagList */
  // tagList.innerHTML = allTags.join(' ');

  // licznik wystąpień tagów
  const tagsParams = calculateTagsParams(allTags);
  console.log(tagsParams);

  
  let allTagsHTML ='';

  for(let tag in allTags){
    // const tagLinkHTML = '<li class="'+ calculateTagClass(allTags[tag], tagsParams) + '">'+ tag +'</li>';
    const thisTagParams = calculateTagClass(allTags[tag], tagsParams);
    console.log('thisTagParams', thisTagParams);
    const tagLinkHTML = '<li class="'+optCloudClassPrefix+thisTagParams + '"><a href="#tag-' + tag + '">' + tag + '</a></li>\n';



    // allTagsHTML += 'class=""'+ tag + ' ('+ allTags[tag]  +')\n';
    allTagsHTML +=tagLinkHTML;

  }
  // END loop for each tag in all Tags
  tagList.innerHTML = allTagsHTML;

}

generateTags();


function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  console.log('tag:', tag);
  /* find all tag links with class active */
  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
  /* START LOOP: for each active tag link */
  for (let activeTag of activeTags){
    /* remove class active */
    activeTag.classList.remove('.active');
    /* END LOOP: for each active tag link */
  }

  console.log('tag href:', href);
  /* find all tag links with "href" attribute equal to the "href" constant */
  const matchingLinks = document.querySelectorAll('a[href="' + href + '"]');


  /* START LOOP: for each found tag link */
  for (let matchingLink of matchingLinks){
    /* add class active */
    matchingLink.classList.add('.active');
    /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  // let linksSelector = '[data-tags~="' + tag + '"]'
  // let linksSelector = ('[data-tags~="' + tag + '"]');
  // console.log(linksSelector)
  // generateTitleLinks(linksSelector);
  generateTitleLinks('[data-tags~="' + tag + '"]');
   
}

function addClickListenersToTags(){
  /* find all links to tags */
  const allTags = document.querySelectorAll('[href^="#tag-"]');
  console.log('allTags:', allTags);

  /* START LOOP: for each link */
  for (let allTag of allTags){
    // console.log(allTag)
    /* add tagClickHandler as event listener for that link */
    allTag.addEventListener('click', tagClickHandler);

    // link.addEventListener('click', titleClickHandler);
  }

  /* END LOOP: for each link */
}

addClickListenersToTags();

// ------------------------------------

function generateAuthors(){

  let allAuthors = {};

  /* [DONE] remove contents of titleList */
  const authorsList = document.querySelector('body > div > div > main > aside:nth-child(3) > ul.list.authors');
  authorsList.innerHTML = '';


  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */
  for(let article of articles){
  
    /* find tags wrapper */    
    const authorsList = article.querySelector(optArticleAuthorSelector);
    console.log('authorsList:', authorsList);

    /* make html variable with empty string */
    let html = '';
    // console.log(html);

    /* get author from data-author attribute */
    const articleAuthor = authorsList.textContent.trim().replace('by ', '');
    console.log('articleAuthor:', articleAuthor); 

    article.setAttribute('data-author', articleAuthor);

    // clean author <p>
    authorsList.textContent= '';


    const linkHTML = '<a href="#author-' + articleAuthor + '">' + articleAuthor + '</a>\n';
    // console.log(linkHTML);

    const articles = article.querySelector('.post-author');

    articles.insertAdjacentHTML('afterbegin', linkHTML);

    /* add generated code to html variable */
    html = html + linkHTML;
    // console.log(html)
  
    if(!allAuthors.hasOwnProperty(articleAuthor)){
      allAuthors[articleAuthor]=1;
    } else {
      allAuthors[articleAuthor]++;
    }
    console.log(allAuthors);

  }
  
  const authorList = document.querySelector(optAuthorsListSelector);

  /* [NEW] add html from allTags to tagList */
  // tagList.innerHTML = allTags.join(' ');

  // licznik wystąpień tagów
  const authorParams = calculateTagsParams(allAuthors);
  console.log(allAuthors);


  let allAuthorsHTML ='';

  for(let articleAuthor in allAuthors){
    const thisAuthorParams = calculateTagClass(allAuthors[articleAuthor], authorParams);
    const authorLinkHTML = '<li class="'+optCloudClassPrefix+thisAuthorParams + '"><a href="#author-' + articleAuthor + '">' + articleAuthor + '</a></li>\n';

    // const authorLinkHTML = '<li class="'+ calculateTagClass(allAuthors[articleAuthor], authorParams) + '">'+ articleAuthor +'</li>';

    // allTagsHTML += 'class=""'+ tag + ' ('+ allTags[tag]  +')\n';
    allAuthorsHTML +=authorLinkHTML;

  }
  // END loop for each tag in all Tags
  authorList.innerHTML = allAuthorsHTML;





}

generateAuthors();


function authorClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  /* make a new constant "tag" and extract tag from the "href" constant */
  const author = href.replace('#author-', '');
  console.log('author:', author);
  /* find all tag links with class active */
  const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');
  console.log('activeAuthors:', activeAuthors);
  /* START LOOP: for each active tag link */
  for (let activeAuthor of activeAuthors){
    /* remove class active */
    activeAuthor.classList.remove('.active');
    /* END LOOP: for each active tag link */
  }

  /* find all tag links with "href" attribute equal to the "href" constant */
  // <a href="#author-by George Tuxedo">by George Tuxedo</a>

  // <a href="#author-by Theo Tabby">by Theo Tabby</a>

  console.log('author href:' ,href);
  const matchingLinks = document.querySelectorAll('a[href="' + href + '"]');
  console.log('matchingLinks:', matchingLinks);

  // const matchingLinks = document.querySelectorAll('a[href="' + href + '"]');


  /* START LOOP: for each found tag link */
  for (let matchingLink of matchingLinks){
    /* add class active */
    matchingLink.classList.add('.active');
    console.log('Added active to', matchingLink);
    /* END LOOP: for each found tag link */
  }

  generateTitleLinks('[data-author="' + author + '"]');
}


function addClickListenersToAuthor(){
  /* find all links to tags */
  const allAuthors = document.querySelectorAll('[href^="#author-"]');
  console.log('allAuthors:', allAuthors);

  /* START LOOP: for each link */
  for (let Author of allAuthors){
    console.log(Author);
    /* add tagClickHandler as event listener for that link */
    Author.addEventListener('click', authorClickHandler);
  }

  /* END LOOP: for each link */
}

addClickListenersToAuthor();