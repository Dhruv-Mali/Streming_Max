import Image from "next/image";
import Link from "next/link";
import { MoreHorizontal, PlusCircle, Edit, Trash } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import api from "@/utils/api";

export default async function Dashboard() {
  let allMovies: any[] = [];
  try {
    const movies = await api.get("/content/movies/all");
    allMovies = movies.data || [];
  } catch (err) {
    console.error("admin/movie page: failed to fetch movies:", err);
    allMovies = [];
  }

  return (
    <div className="pt-20 flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Tabs defaultValue="all">
            <div className="flex items-center ">
              <div className="ml-auto flex items-center gap-2 py-5">
                <Link href="/admin/movie/add">
                  <Button size="sm" className="h-8 gap-1">
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Add Movie
                    </span>
                  </Button>
                </Link>
              </div>
            </div>
            <TabsContent value="all">
              <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                  <CardTitle>Movies</CardTitle>
                  <CardDescription>
                    Manage your movies and their details
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table className="min-w-full divide-y divide-gray-200">
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[100px]">
                            <span className="sr-only">Image</span>
                          </TableHead>
                          <TableHead>Title</TableHead>
                          <TableHead className="hidden md:table-cell">
                            Release Year
                          </TableHead>
                          <TableHead className="hidden md:table-cell">
                            Duration
                          </TableHead>
                          <TableHead className="hidden md:table-cell">
                            Age Rating
                          </TableHead>
                          <TableHead className="hidden md:table-cell">
                            Created At
                          </TableHead>
                          <TableHead>
                            <span className="sr-only">Actions</span>
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {allMovies.map((movie: any) => (
                          <TableRow key={movie.movie_id}>
                            <TableCell>
                              <Image
                                alt={movie.title}
                                className="aspect-square rounded-md object-cover"
                                height="64"
                                src={movie.images[0].image_url} // Replace with actual image URL if available
                                width="64"
                              />
                            </TableCell>
                            <TableCell className="font-medium">
                              {movie.title}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {movie.release_year}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {movie.duration} mins
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {movie.age_rating}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {new Date(movie.created_at).toLocaleString()}
                            </TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    aria-haspopup="true"
                                    size="icon"
                                    variant="ghost"
                                  >
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Toggle menu</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuItem className="cursor-pointer">
                                    <Edit className="h-4 w-4 mr-2" />
                                    Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="cursor-pointer">
                                    <Trash className="h-4 w-4 mr-2" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="text-xs text-muted-foreground">
                    Showing <strong>1-{allMovies.length}</strong> of{" "}
                    <strong>{allMovies.length}</strong> movies
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
