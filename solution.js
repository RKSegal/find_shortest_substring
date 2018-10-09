function findShortestSubstring(listOfWords, stringOfText) {
  
  // remove punctuations and split the sentence
  const santizedSentanceArray = stringOfText
  .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"")
  .toLowerCase()
  .split(" ");

  // validate that all words can exist in the string
  if (santizedSentanceArray.length < listOfWords.length) {
    throw new Error("The array of words is longer than the sentence provided.");
  }
  
  // create hash map for each word
  const wordsDict = {};
  listOfWords.forEach(w => wordsDict[w] = -1)

  // Loop through the santizedSentanceArray
  let start = -1;
  let end = -1;
  currentLength = santizedSentanceArray.length; 
  const numberOfWords = listOfWords.length;
  for (let i = 0; i < santizedSentanceArray.length; i++) { 
    if (wordsDict[santizedSentanceArray[i]]){ 
      wordsDict[santizedSentanceArray[i]] = i;

      if (allWordsFoundInSentence(wordsDict)) {
        console.log('i: ' + i);
        // Check length of possible substrings
        const {min, max} = getMinAndMaxValueFromObject(wordsDict);
        //console.log(min);
        //console.log(max);
        if ((max - min) < currentLength) {
          currentLength = (max - min);
          start = min;
          end = max;
        }
      }
    }
  } 
  if ( start === -1 || end === -1) {
    throw new Error("The sentence provided does not contain all of the words in the list."); 
  }
  stringOfText = stringOfText.split(" ").slice(start, (end + 1)).join(" ");
  return stringOfText;
  //return { start, end };
}

//function to validate that all words exist in the sentence
function allWordsFoundInSentence(obj) {
  let allWordsIncluded = true;
  Object.keys(obj).forEach((item) => {
    if (obj[item] < 0) {
      allWordsIncluded = false;
    }
  });
  return allWordsIncluded;
}

// function that returns object { min: Int, max: Int }
function getMinAndMaxValueFromObject(obj) {
  let min = Infinity;
  let max = -Infinity;
  Object.keys(obj).forEach((item) => {
    if (obj[item] > max) {
      max = obj[item];
    }
    if (obj[item] < min) {
      min = obj[item];
    }
  });
  return {min, max};
}

findShortestSubstring(["cat", "dog", "chased"], "My cat was missing today. I hope she comes back. She was chased by the dog next door. I love my cat.");

findShortestSubstring(["hair", "car", "claws", "grumpy"], "Leave hair on clothes walk on car leaving trail of paw prints on hood and windshield yet more napping, more napping all the napping is exhausting. Stare at ceiling light human clearly uses close to one life a night no one naps that long so i revive by standing on chest awaken! annoy the old grumpy cat, start a fight and then retreat to wash when i lose yet hide at bottom of staircase to trip human or headbutt owner's knee. Eats owners hair then claws head annoy the old grumpy cat, start a fight and then retreat to wash when i lose. Loved it, hated it, loved it, hated it ignore the human until she needs to get up, then climb on her lap and sprawl for always ensure to lay down in such a manner that tail can lightly brush human's nose . Purr as loud as possible, be the most annoying cat that you can, and, knock everything off the table wake up human for food at 4am or sleep on dog bed, force dog to sleep on floor refuse to drink water except out of someone's glass yet cat slap dog in face.")
