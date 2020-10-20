package main

import "fmt"
import "os"

func main() {
	var data = os.Getenv("TT_TRANSFORM")

	fmt.Println(data)
}