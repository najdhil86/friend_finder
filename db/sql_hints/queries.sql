/*
SELECT *
FROM scores s1
LEFT JOIN (SELECT *
FROM scores s2
WHERE s2.friend_id != s1.friend_id) t2
ON t2.question_id = s1.question_id;
*/

/* ERROR 1054 (42S22): Unknown column 't2.question_id' in 'on clause' */

USE friends_db;

SELECT * FROM
(SELECT SUM(answer_difference) ans_diff_total, friend_id, t2friend_id
FROM
(SELECT question_id, friend_id, t2friend_id, answer_difference FROM 
(SELECT *, ABS(answer-t2answer) AS answer_difference FROM
(SELECT *
FROM scores s1
LEFT JOIN (SELECT question_id AS t2question_id, friend_id AS t2friend_id, answer AS t2answer
FROM scores s2) t2
ON t2question_id = s1.question_id) t3) t4) t5
GROUP BY t2friend_id, friend_id) t6
WHERE t6.friend_id = 1
ORDER BY ans_diff_total;

/*
SELECT question_id, friend_id, t2friend_id, answer_difference FROM 
(SELECT *, (answer-t2answer) AS answer_difference FROM
(SELECT *
FROM scores s1
LEFT JOIN (SELECT question_id AS t2question_id, friend_id AS t2friend_id, answer AS t2answer
FROM scores s2) t2
ON t2question_id = s1.question_id) t3) t4;
*/


/* artur: */
/*
SELECT SUM(score_difference) AS difference, friend_name, picture_link
FROM
(SELECT *, ABS(score-t2score) AS score_difference FROM
(SELECT *
FROM scores s1
LEFT JOIN (SELECT question_id AS t2question_id, friend_id AS t2friend_id, score AS t2score
FROM scores s2) t2
ON t2question_id = s1.question_id) t3) t4
LEFT JOIN friends 
ON t4.friend_id = friends.friend_id
WHERE t2friend_id != 10
GROUP BY friend_name, picture_link
ORDER BY difference;
*/
