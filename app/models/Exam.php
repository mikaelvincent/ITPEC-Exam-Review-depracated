<?php

class Exam extends Model
{
    public function getAllExams()
    {
        $stmt = $this->db->prepare("SELECT exam_name, exam_alias FROM exams");
        $stmt->execute();
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

        foreach ($results as $key => $exam) {
            $results[$key]["exam_alias_url"] = makeUrlFriendly(
                $exam["exam_alias"]
            );
        }
        return $results;
    }

    public function getExamByAlias($exam_alias)
    {
        $words = extractWordsFromAlias($exam_alias);

        if (empty($words)) {
            return null;
        }

        $likeQuery = buildLikeQuery($words, "exam_alias");

        $sql = "SELECT * FROM exams WHERE " . $likeQuery . " LIMIT 1";
        $stmt = $this->db->prepare($sql);

        foreach ($words as $index => $word) {
            $stmt->bindValue(":word" . $index, "%" . $word . "%");
        }

        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function getExamSets($exam_id)
    {
        $stmt = $this->db->prepare(
            "SELECT * FROM exam_sets WHERE exam_id = :exam_id"
        );
        $stmt->execute(["exam_id" => $exam_id]);
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

        foreach ($results as $key => $examSet) {
            $results[$key]["exam_set_alias_url"] = makeUrlFriendly(
                $examSet["exam_set_alias"]
            );
        }
        return $results;
    }
}
