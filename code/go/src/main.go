package main

import (
	"fmt"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
)

var db *gorm.DB
var err error

//User table
type User struct {
	// ID       uint   `json:"id"`
	Id       uint   `json:"id"; gorm:"primary_key";"AUTO_INCREMENT"`
	Name     string `json:"name"`
	Email    string `json:"email"`
	Password string `json:"password"`
	Isadmin  bool   `json:"isadmin"`
}

//Genre table
type Genre struct {
	Id uint `json:"id"; gorm:"primary_key";"AUTO_INCREMENT"`
	// ID   uint   `json:"id"`
	Name string `json:"name"`
}

//Quiz Table
type Quiz struct {
	Id uint `json:"id";gorm:"primary_key";"AUTO_INCREMENT"`
	//ID    uint   `json:"id"`
	Gid   uint   `json:"gid"`
	Qtype string `json:"qtype"`
}

//Question Table
type Question struct {
	Id uint `json:"id" ;gorm:"primary key";"AUTO_INCREMENT"`
	//ID       uint   `json:"id"`
	Qid      string `json:"qid"`
	Question string `json:"question"`
	Opt1     string `json:"opt1"`
	Opt2     string `json:"opt2"`
	Opt3     string `json:"opt3"`
	Opt4     string `json:"opt4"`
	Ismul    bool   `json:"ismul"`
	Isopt1   bool   `json:"isopt1"`
	Isopt2   bool   `json:"isopt2"`
	Isopt3   bool   `json:"isopt3"`
	Isopt4   bool   `json:"isopt4"`
}

type Scoreboard struct {
	Id    uint   `json:"id" ;gorm:"primary key";"AUTO_INCREMENT"`
	Genre string `json:"genre"`
	Email string `json:"email"`
	Score uint   `json:"score"`
	Qid   string `json:"qid"`
	Qtype string `json:"qtype"`
}

type GenreLb struct {
	Email string `json:"email"`
	Score uint   `json:"score"`
}

func main() {
	db, err = gorm.Open("sqlite3", "./gorm.db")
	if err != nil {
		fmt.Println(err)
	}
	defer db.Close()

	db.AutoMigrate(&User{}, &Genre{}, &Quiz{}, &Question{}, &Scoreboard{})
	r := gin.Default()

	r.GET("/user/", GetUser)
	r.GET("/genre/", GetGenre)
	r.POST("/user", CreateUser)
	r.POST("/question/:id", CreateQuestion)
	r.GET("/question/:id", GetSinglequestion)
	r.POST("/quiz/:genre", CreateQuiz)
	r.POST("/genre", CreateGenre)
	r.GET("/genre/:genrename", GetQuiz)
	r.GET("/quiz/:id", GetQuestion)
	r.POST("/loginuser/", LoginUser)
	r.DELETE("/deletequiz/:id", DeleteQuiz)
	r.DELETE("/deleteuser/:id", Deleteuser)
	r.DELETE("/deletequestion/:id", DeleteQuestion)
	r.PUT("/updatequestion/:id", UpdateQuestion)
	r.POST("/addscore/:id", Addscore)
	r.GET("/perfomance/:email", Perfomance)
	r.GET("/leaderboard", Leaderboard)
	r.GET("/genreboard/:genre", Genreboard)
	r.Use((cors.Default()))
	r.Run(":8080") // Run on port 8080
}

func Deleteuser(c *gin.Context) {
	id := c.Params.ByName("id")
	var user User
	db.Where("id = ?", id).First(&user)
	email := user.Email
	d := db.Where("id = ?", id).Delete(&user)
	var scoreboard Scoreboard
	db.Where("email = ?", email).Delete(&scoreboard)
	fmt.Println(d)
	c.Header("access-control-allow-origin", "*")
	c.JSON(200, gin.H{"id #" + id: "deleted"})
}

func UpdateQuestion(c *gin.Context) {
	var question Question
	id := c.Params.ByName("id")
	if err := db.Where("id = ?", id).First(&question).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	}
	c.BindJSON(&question)
	db.Save(&question)
	c.Header("access-control-allow-origin", "*")
	c.JSON(200, question)
}

func Addscore(c *gin.Context) {
	var scoreboard Scoreboard
	c.BindJSON(&scoreboard)
	var quiz Quiz
	qid := c.Params.ByName("id")
	scoreboard.Qid = qid
	id := scoreboard.Qid
	db.Where("id = ?", id).First(&quiz)
	scoreboard.Qtype = quiz.Qtype
	gid := quiz.Gid
	var genre Genre
	db.Where("id = ?", gid).First(&genre)
	name := genre.Name
	scoreboard.Genre = name
	db.Create(&scoreboard)
	c.Header("access-control-allow-origin", "*")
	c.JSON(200, scoreboard)
}

func Perfomance(c *gin.Context) {
	email := c.Params.ByName("email")
	var scoreboard []Scoreboard
	db.Where("email = ?", email).Find(&scoreboard)
	c.Header("access-control-allow-origin", "*")
}

func CreateUser(c *gin.Context) {
	var user User
	c.BindJSON(&user)
	db.Create(&user)
	c.Header("access-control-allow-origin", "*")
	c.JSON(200, user)
}

func CreateQuestion(c *gin.Context) {
	var question Question
	id := c.Params.ByName("id")
	c.BindJSON(&question)
	question.Qid = id
	db.Create(&question)
	c.Header("access-control-allow-origin", "*")
	c.JSON(200, question)
}

func CreateGenre(c *gin.Context) {
	var genre Genre
	c.BindJSON(&genre)
	db.Create(&genre)
	c.Header("access-control-allow-origin", "*")
}

func CreateQuiz(c *gin.Context) {
	var quiz Quiz
	genrename := c.Params.ByName("genre")
	var genre Genre
	db.Where("name = ?", genrename).First(&genre)
	gid := genre.Id
	c.BindJSON(&quiz)
	quiz.Gid = gid
	db.Create(&quiz)
	c.Header("access-control-allow-origin", "*")
	c.JSON(200, quiz)
}

func GetUser(c *gin.Context) {
	var user []User
	if err := db.Find(&user).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, user)
	}
}

func GetGenre(c *gin.Context) {
	var genre []Genre
	if err := db.Find(&genre).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, genre)
	}
}

func GetQuiz(c *gin.Context) {
	genrename := c.Params.ByName("genrename")
	var genre Genre
	db.Where("name = ?", genrename).First(&genre)
	gid := genre.Id
	var quiz []Quiz
	if err := db.Where("gid= ?", gid).Find(&quiz).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, quiz)
	}
}

func GetQuestion(c *gin.Context) {
	quizid := c.Params.ByName("id")
	var question []Question
	if err := db.Where("qid= ?", quizid).Find(&question).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, question)
	}
}

func GetSinglequestion(c *gin.Context) {
	quesid := c.Params.ByName("id")
	var question Question
	if err := db.Where("id= ?", quesid).First(&question).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, question)
		fmt.Println(question)
	}

}

func LoginUser(c *gin.Context) {
	var user User
	c.BindJSON(&user)
	var user1 User
	logged_in := 0
	if err := db.Where("email = ?", user.Email).Find(&user1).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		if user1.Email == user.Email && user1.Password == user.Password && user1.Isadmin == true {
			logged_in = 3
		} else if user1.Email == user.Email && user1.Password == user.Password && user1.Isadmin == false {
			logged_in = 2
		} else if user.Email == user1.Email && user.Password != user1.Password {
			logged_in = 1
		} else {
			logged_in = 0
		}
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, logged_in)
	}
}

func DeleteQuiz(c *gin.Context) {
	quizid := c.Params.ByName("id")
	var quiz Quiz
	var question Question
	d := db.Where("id = ?", quizid).Delete(&quiz)
	db.Where("qid = ?", quizid).Delete(&question)
	fmt.Println(d)
	c.Header("access-control-allow-origin", "*")
	c.JSON(200, gin.H{"id #" + quizid: "deleted"})
}

func DeleteQuestion(c *gin.Context) {
	quesid := c.Params.ByName("id")
	var question Question
	d := db.Where("id = ?", quesid).Delete(&question)
	fmt.Println(d)
	c.Header("access-control-allow-origin", "*")
	c.JSON(200, gin.H{"id #" + quesid: "deleted"})
}

func Leaderboard(c *gin.Context) {
	var p []GenreLb
	db.Table("scoreboards").Select("SUM(score) as score,email").Group("email").Find(&p)
	c.Header("access-control-allow-origin", "*")
	c.JSON(200, p)
}

func Genreboard(c *gin.Context) {
	var p []GenreLb
	genre := c.Params.ByName("genre")
	db.Table("scoreboards").Select("SUM(score) as score,email").Where("genre=?", genre).Group("email").Find(&p)
	c.Header("access-control-allow-origin", "*")
	c.JSON(200, p)
}
